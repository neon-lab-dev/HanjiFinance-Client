import { baseApi } from "../../Api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (searchQuery) => ({
        url: `/product?keyword=${searchQuery}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),

    getSingleProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductByIdQuery } =
  productApi;
