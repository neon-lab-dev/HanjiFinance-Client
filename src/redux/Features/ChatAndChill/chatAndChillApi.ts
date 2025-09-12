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
      providesTags: ["chatAndChill"],
    }),

    getSingleConsultationById: builder.query({
      query: (id) => ({
        url: `/chat-and-chill/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["chatAndChill"],
    }),

    getAllLecturesByCourseId: builder.query({
      query: (id) => ({
        url: `/chat-and-chill/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["chatAndChill"],
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: `/chat-and-chill/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chatAndChill"],
    }),

    scheduleMeeting: builder.mutation({
      query: (data) => ({
        url: `/chat-and-chill/schedule-meeting`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chatAndChill"],
    }),

    updateStatus: builder.mutation({
      query: ({data, id}) => ({
        url: `/chat-and-chill/update-status/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chatAndChill"],
    }),
  }),
});

export const {
  useGetAllConsultationsQuery,
  useGetSingleConsultationByIdQuery,
  useGetAllLecturesByCourseIdQuery,
  useAddCourseMutation,
  useScheduleMeetingMutation,
  useUpdateStatusMutation,
} = chatAndChillApi;
