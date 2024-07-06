import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = {
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: ''
  },
  orderItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
      updateCart(state);
    },
    setPrices: (state) => {
      updateCart(state);
    },
    resetShipping: (state) => {
      state.shippingAddress = initialState.shippingAddress;
      state.orderItems = initialState.orderItems;
      state.itemsPrice = initialState.itemsPrice;
      state.shippingPrice = initialState.shippingPrice;
      state.taxPrice = initialState.taxPrice;
      state.totalPrice = initialState.totalPrice;
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('cart');
    }
  }
});

export const { setShippingAddress, setOrderItems, setPrices, resetShipping } = shippingSlice.actions;

export default shippingSlice.reducer;
