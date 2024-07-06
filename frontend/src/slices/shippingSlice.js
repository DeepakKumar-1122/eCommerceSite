import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {
      // orderItems: [],
      shippingAddress: {},
      paymentMethod: "",
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state));
    },
    // setOrderItems: (state, action) => {
    //   state.orderItems = action.payload;
    //   updateCart(state);
    //   localStorage.setItem("shipping", JSON.stringify(state));
    // },
    setPrices: (state) => {
      updateCart(state);
      localStorage.setItem("shipping", JSON.stringify(state));
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state));
    },
    resetShipping: (state) => {
      state.shippingAddress = initialState.shippingAddress;
      // state.orderItems = initialState.orderItems;
      state.itemsPrice = initialState.itemsPrice;
      state.shippingPrice = initialState.shippingPrice;
      state.taxPrice = initialState.taxPrice;
      state.totalPrice = initialState.totalPrice;
      state.paymentMethod = initialState.paymentMethod;
      localStorage.removeItem("shipping");
      // localStorage.removeItem('cart');
    },
  },
});

export const {
  setShippingAddress,
  setOrderItems,
  setPrices,
  setPaymentMethod,
  resetShipping,
} = shippingSlice.actions;

export default shippingSlice.reducer;
