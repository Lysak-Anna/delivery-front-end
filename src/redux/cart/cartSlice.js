import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  cart: [],
  category: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addProduct(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item) {
        item.count++;
      } else {
        state.cart.push({ ...payload, count: 1 });
        state.category = payload.category;
      }
    },
    increaseCount(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload);
      if (item) item.count += 1;
    },
    decreaseCount(state, { payload }) {
      const item = state.cart.find((item) => item.id === payload);
      if (item) item.count -= 1;
    },
    deleteProduct(state, { payload }) {
      state.cart = state.cart.filter((product) => product.id !== payload);
      if (state.cart.length === 0) {
        state.category = null;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.category = null;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseCount,
  decreaseCount,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
