import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    addUser(state, { payload }) {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.phone = payload.phone;
      state.user.address = payload.address;
    },
    setAddress(state, { payload }) {
      state.user.address = payload;
    },
  },
});

export const { addUser, setAddress } = userSlice.actions;

export const userReducer = userSlice.reducer;
