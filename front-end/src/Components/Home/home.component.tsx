import React from 'react';
import './Home.css';
import { AbsoluteCenter, Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { RentPostComponent } from '../Rentpost/rent-post.component';
import { IRentPostInterface } from 'types';
import { useGetAllRentPostsQuery } from 'Redux/services/rent-post.redux-services';
import { ErrorPageComponent } from 'Components/ErrorPage/error-page.component';

import { UserSchema } from 'zod-types';
import { z } from 'zod';

interface HomeComponentProps {}

export const HomeComponent: React.FC<HomeComponentProps> = (
  props: HomeComponentProps,
) => {
  //fetch all rent post's
  const {
    data: allRentPosts,
    error: allRentPostsError,
    isLoading: allRentPostsIsLoading,
  } = useGetAllRentPostsQuery('');

  return (
    <>
      <div className="home-main">
        <Stack spacing={3} className="rent-post-heading">
          <Text fontSize="6xl">All Rent Posts</Text>
        </Stack>
        {allRentPostsIsLoading ? (
          <Box position="relative" h="200px">
            <AbsoluteCenter p="4" color="white" axis="both">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </AbsoluteCenter>
          </Box>
        ) : (
          <Stack>
            {allRentPostsError ? (
              <ErrorPageComponent
                error={allRentPostsError}
              ></ErrorPageComponent>
            ) : (
              <div className="home-rent-post">
                {allRentPosts &&
                  allRentPosts.map((rentPost: IRentPostInterface) => (
                    <RentPostComponent
                      post={rentPost}
                      key={rentPost.id}
                    ></RentPostComponent>
                  ))}
              </div>
            )}
          </Stack>
        )}
      </div>
    </>
  );
};
