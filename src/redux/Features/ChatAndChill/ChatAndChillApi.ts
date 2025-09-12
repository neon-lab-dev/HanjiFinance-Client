import { baseApi } from "../../Api/baseApi";

const NewsLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsLetter: builder.mutation({
      query: (SubscribersData) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: SubscribersData,
        credentials: "include",
      }),
      invalidatesTags: ["chatandchill"],
    }),
    getAvailability: builder.query({
      query: () => ({
        url: `/availability`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["chatandchill"],
    }),
  }),
});

export const { useSubscribeNewsLetterMutation, useGetAvailabilityQuery } =
  NewsLetterApi;
