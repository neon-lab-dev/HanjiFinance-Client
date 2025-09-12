/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../Api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getAllCourses: builder.query({
      query: ({ keyword, page }: { keyword?: string; page?: number }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", page.toString());

        return {
          url: `/course${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["course"],
    }),


    getSingleCourseById: builder.query({
      query: (id) => ({
        url: `/course/single/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    getCourseLecture: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseByIdQuery,
  useGetCourseLectureQuery,
} = courseApi;
