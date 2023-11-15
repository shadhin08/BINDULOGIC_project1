import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRentAreaInterface, IRentPostInterface } from 'types';

export const rentPostApi = createApi({
  reducerPath: 'rentPostApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), //http://localhost:8080/rentposts/get/all

  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    //for get all rent posts
    getAllRentPosts: builder.query<IRentPostInterface[], string>({
      query: () => '/rentposts/get/all',
      providesTags: ['Posts'],
    }),

    //for get rent post by username
    getRentPostsByUsername: builder.query<IRentPostInterface[], string>({
      query: (username) => `/rentpost/get/${username}`,
      providesTags: ['Posts'],
    }),

    //for create a new rent post
    createRentPost: builder.mutation<IRentPostInterface, IRentPostInterface>({
      query: (rentPost) => ({
        url: '/rentpost/post/register',
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: { 'Content-Type': 'application/json' },
        body: rentPost,
      }),
      invalidatesTags: ['Posts'],
    }),

    //for get all rent area
    getAllRentAreas: builder.query<IRentAreaInterface[], string>({
      query: () => '/area/get/all',
      providesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetAllRentPostsQuery,
  useGetRentPostsByUsernameQuery,
  useCreateRentPostMutation,
  useGetAllRentAreasQuery,
} = rentPostApi;
