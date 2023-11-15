import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const findUserByUsernameApi = createApi({
  reducerPath: 'findUserByUsernameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), //http://localhost:8080/rentposts/get/all
  endpoints: (builder) => ({
    //for log in
    getUserByUsername: builder.query({
      query: (username) => `/user/get/${username}`,
    }),
  }),
});

export const { useGetUserByUsernameQuery } = findUserByUsernameApi;
