import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { addProduct } from "../../redux/cart/cartSlice";
import { getCategoryFromState } from "../../redux/cart/selectors";

export default function ProductCard({ id, image, name, price, category }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedCategory = useSelector(getCategoryFromState);

  const addProductToCart = () => {
    if (selectedCategory !== null && selectedCategory !== category) {
      return toast({
        position: "top-center",
        render: () => (
          <Box color="white" p={3} bg="#db0038">
            Oops! Please, make different orders from different restaurants!
          </Box>
        ),
      });
    }
    dispatch(addProduct({ id, name, price, image, category }));
    return toast({
      position: "top-center",
      render: () => (
        <Box color="white" p={3} bg="#519dd9">
          Added to your cart!
        </Box>
      ),
    });
  };

  return (
    <Card maxW="sm" ml="auto" mr="auto">
      <CardBody>
        <Image
          src={image}
          alt={name}
          borderRadius="lg"
          height="260px"
          width="100%"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={addProductToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
