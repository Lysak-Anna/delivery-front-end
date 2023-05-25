import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { getProductFromState } from "../../redux/cart/selectors";
import AmountInput from "../AmountInput/AmountInput";
import { Bin } from "./OrderTable.styled";
import { deleteProduct } from "../../redux/cart/cartSlice";

export default function OrderTable() {
  const dispatch = useDispatch();
  const products = useSelector(getProductFromState);
  const totalSum = () => {
    return products.reduce(
      (acc, product) => (acc += product.price * product.count),
      0
    );
  };
 
  return (
    <Box>
      {products.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Total sum: ${totalSum()}</TableCaption>
            <Thead></Thead>
            <Tbody>
              {products &&
                products.map(({ name, id, price, count, image }) => (
                  <Tr key={id}>
                    <Td>
                      <Image
                        borderRadius="4"
                        src={image}
                        width="60px"
                        height="60px"
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{name}</Td>
                    <Td>${price}</Td>

                    <Td>
                      <AmountInput count={count} id={id} />
                    </Td>
                    <Td isNumeric>${price * count}</Td>
                    <Td>
                      <Bin onClick={() => dispatch(deleteProduct(id))} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      ) : (
        <Text fontSize="lg" textAlign="center" fontWeight="500" color="#519dd9">
          There are no products in your cart. Add something tasty to make an
          order!
        </Text>
      )}
    </Box>
  );
}
