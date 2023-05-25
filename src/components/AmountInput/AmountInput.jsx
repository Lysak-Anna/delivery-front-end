import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { increaseCount, decreaseCount } from "../../redux/cart/cartSlice";

export default function AmountInput({ count, id }) {
  const dispatch = useDispatch();

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: count,
      min: 1,
      max: 20,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="160px" textAlign="center">
      <Button {...inc} onClick={() => dispatch(increaseCount(id))}>
        +
      </Button>
      <Input {...input} />
      <Button {...dec} onClick={() => dispatch(decreaseCount(id))}>
        -
      </Button>
    </HStack>
  );
}
