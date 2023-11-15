import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserCredentialsInterface, IUserInterface } from 'types';

export const userLoginApi = createApi({
  reducerPath: 'userLoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), //http://localhost:8080/rentposts/get/all
  endpoints: (builder) => ({
    userLogIn: builder.mutation<IUserInterface, IUserCredentialsInterface>({
      query: (userCredentials) => ({
        url: '/user/login',
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: { 'Content-Type': 'application/json' },
        body: userCredentials,
      }),
    }),
  }),
});

export const { useUserLogInMutation } = userLoginApi;
