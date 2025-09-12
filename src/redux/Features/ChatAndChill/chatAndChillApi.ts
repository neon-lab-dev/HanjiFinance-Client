import { baseApi } from "../../Api/baseApi";

const chatAndChillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsultations: builder.query({
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
          url: `/chat-and-chill${
            params.toString() ? `?${params.toString()}` : ""
          }`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["course"],
    }),

    getSingleConsultationById: builder.query({
      query: (id) => ({
        url: `/chat-and-chill/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    getAllLecturesByCourseId: builder.query({
      query: (id) => ({
        url: `/chat-and-chill/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["course"],
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: `/chat-and-chill/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    updateCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `/chat-and-chill/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/chat-and-chill/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    addLecture: builder.mutation({
      query: (data) => ({
        url: `/chat-and-chill-lecture/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),

    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/chat-and-chill-lecture/delete/${lectureId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllConsultationsQuery,
  useGetSingleConsultationByIdQuery,
  useGetAllLecturesByCourseIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAddLectureMutation,
  useDeleteLectureMutation,
} = chatAndChillApi;
