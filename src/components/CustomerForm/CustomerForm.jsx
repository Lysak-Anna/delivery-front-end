import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import OrderTable from "../OrderTable/OrderTable";
import { schema } from "../../schema";
import { getProductFromState } from "./../../redux/cart/selectors";
import { createOrder } from "../../api/api";
import { getUserFromState } from "./../../redux/user/selectors";
import { addUser } from "../../redux/user/userSlice";
import { clearCart } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CustomerForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector(getProductFromState);
  const user = useSelector(getUserFromState);
  const recaptchaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("address", user.address);
  }, [user, setValue]);

  const onSubmitHandler = async (data) => {
    try {
      const recaptchaValue = recaptchaRef.current.getValue();

      if (recaptchaValue) {
        setIsLoading(true);
        await dispatch(addUser({ ...data }));
        await createOrder({ ...data, order, token: recaptchaValue });
        dispatch(clearCart());
        navigate("/");
        return toast({
          position: "top-center",
          render: () => (
            <Box color="white" p={3} bg="#519dd9">
              Got it! Our manager will call you within 10 minutes!
            </Box>
          ),
        });
      } else {
        return toast({
          position: "top-center",
          render: () => (
            <Box color="white" p={3} bg="#519dd9">
              Please, let us know that you are not a robot, check the captcha
              before make an order!
            </Box>
          ),
        });
      }
    } catch (error) {
      return toast({
        position: "top-center",
        render: () => (
          <Box color="white" p={3} bg="#db0038">
            {error.message}
          </Box>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={4} mb={8} mt={8}>
          <Input placeholder="Name" size="md" {...register("name")} />
          {errors.name && (
            <Text color="#db0038" fontSize="sm">
              {errors.name.message}
            </Text>
          )}
          <Input
            placeholder="Email"
            size="md"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <Text color="#db0038" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <InputGroup size="md">
            <InputLeftAddon children="+38" />
            <Input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
            />
          </InputGroup>
          {errors.phone && (
            <Text color="#db0038" fontSize="sm">
              {errors.phone.message}
            </Text>
          )}
          <Input placeholder="Address" size="md" {...register("address")} />
          {errors.address && (
            <Text color="#db0038" fontSize="sm">
              {errors.address.message}
            </Text>
          )}
        </Stack>

        <OrderTable />
        {order.length > 0 && (
          <>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY}
              ref={recaptchaRef}
            />
            <Button
              colorScheme="blue"
              type="submit"
              ml="auto"
              display="block"
              isLoading={isLoading}
            >
              Make an order
            </Button>
          </>
        )}
      </form>
    </section>
  );
}
