import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { TbDiscountCheckFilled } from "react-icons/tb";

export const HeaderBox = styled.header`
  height: 90px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 60px;
  background-color: #ededed;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledLink = styled(NavLink)`
  color: #f7c200;

  font-size: 20px;
  line-height: 1.5;
  font-weight: 500;

  &:hover,
  &:focus,
  &.active {
    color: #db0038;
  }
`;

export const RelativeContainer = styled.span`
  position: relative;
`;
export const StyledCart = styled(GiShoppingCart)`
  width: 30px;
  height: 30px;
  color: inherit;
`;
export const Mark = styled(TbDiscountCheckFilled)`
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  color: green;
`;
