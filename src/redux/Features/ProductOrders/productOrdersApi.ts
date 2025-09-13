import { baseApi } from "../../Api/baseApi";

const productOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductOrders: builder.query({
      query: ({
        keyword,
        page,
        status,
      }: {
        keyword?: string;
        page?: number;
        status?: string;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());
        if (status) params.append("status", status);

        return {
          url: `/product-order${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["productOrder"],
    }),

    getSingleProductOrderById: builder.query({
      query: (id) => ({
        url: `/product-order/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productOrder"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: `/product/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/product-order/update-status`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["productOrder"],
    }),
  }),
});

export const {
  useGetAllProductOrdersQuery,
  useGetSingleProductOrderByIdQuery,
  useAddProductMutation,
  useUpdateOrderStatusMutation,
  useDeleteProductMutation,
} = productOrdersApi;
