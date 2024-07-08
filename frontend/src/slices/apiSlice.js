import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASEURL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
