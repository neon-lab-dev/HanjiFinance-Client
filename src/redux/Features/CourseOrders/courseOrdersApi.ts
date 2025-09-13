import { baseApi } from "../../Api/baseApi";

const courseOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseOrders: builder.query({
      query: ({
        keyword,
        page,
      }: {
        keyword?: string;
        page?: number;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());

        return {
          url: `/course-order${params.toString() ? `?${params.toString()}` : ""}`,
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
  useGetAllCourseOrdersQuery,
  useGetSingleProductOrderByIdQuery,
  useAddProductMutation,
  useUpdateOrderStatusMutation,
  useDeleteProductMutation,
} = courseOrdersApi;
