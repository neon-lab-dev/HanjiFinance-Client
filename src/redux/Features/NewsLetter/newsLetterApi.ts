import { baseApi } from "../../Api/baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewsletter: builder.query({
      query: ({ keyword, page }: { keyword?: string; page?: number }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());

        return {
          url: `/newsletter${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["newsletter"],
    }),

    // deleteVideo: builder.mutation({
    //   query: ({ courseId, lectureId }) => ({
    //     url: `/lectures?courseId=${courseId}&lectureId=${lectureId}`,
    //     method: "DELETE",
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["course"],
    // }),
  }),
});

export const { useGetAllNewsletterQuery } = newsletterApi;
