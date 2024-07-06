import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `${CART_URL}/${itemId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `${CART_URL}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;
