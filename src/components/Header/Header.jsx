import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FlexContainer,
  HeaderBox,
  Mark,
  RelativeContainer,
  StyledCart,
  StyledLink,
} from "./Header.styled";
import Logo from "../../assets/logo.png";
import { getProductFromState } from "../../redux/cart/selectors";
import { Container } from "../../pages/Restaurants/Restaurants.styled";
import Loader from "../Loader/Loader";

export default function Header() {
  const products = useSelector(getProductFromState);
  return (
    <>
      <HeaderBox>
        <Container>
          <FlexContainer>
            <img src={Logo} alt="logo" width="70px" height="70px" />
            <StyledLink to="/">Restaurants</StyledLink>
            <StyledLink to="/cart">
              <RelativeContainer>
                <StyledCart />
                {products.length > 0 && <Mark />}
              </RelativeContainer>
            </StyledLink>
          </FlexContainer>
        </Container>
      </HeaderBox>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
