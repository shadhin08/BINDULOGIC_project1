import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserInterface } from 'types';

export const userSignupApi = createApi({
  reducerPath: 'userSignupApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), //http://localhost:8080/rentposts/get/all
  endpoints: (builder) => ({
    userSignUp: builder.mutation<IUserInterface, IUserInterface>({
      query: (userData) => ({
        url: '/user/post/register',
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }),
    }),
  }),
});

export const { useUserSignUpMutation } = userSignupApi;
