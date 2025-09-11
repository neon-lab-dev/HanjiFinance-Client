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
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSubscribeNewsLetterMutation,
} = NewsLetterApi;