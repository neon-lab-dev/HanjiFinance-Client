import { baseApi } from "../../Api/baseApi";

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
      query: ({ keyword, category }) => ({
        url: `/course`,
        method: "GET",
        credentials: "include",
        params: {
          keyword,
          category,
        },
      }),
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

        getAllCategories: builder.query({
            query: () => ({
                url: `/category`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["course"],
        }),
    }),
});

export const {useGetAllCoursesQuery, useGetSingleCourseByIdQuery, useGetCourseLectureQuery, useGetAllCategoriesQuery} = courseApi;
