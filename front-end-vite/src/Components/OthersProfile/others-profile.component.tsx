import React from 'react';
import {
  Card,
  Stack,
  Image,
  CardBody,
  Heading,
  Text,
  Spinner,
  Box,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { RentPostComponent } from '../Rentpost/rent-post.component';
import { useGetRentPostsByUsernameQuery } from 'Redux/services/rent-post.redux-services';
import { useGetUserByUsernameQuery } from 'Redux/services/user.redux-services';
import { ErrorPageComponent } from 'Components/ErrorPage/error-page.component';
import { IRentPostInterface } from 'types';

interface OthersProfileComponentProps {}

export const OthersProfileComponent: React.FC<
  OthersProfileComponentProps
> = () => {
  //get params for getting the username
  const params = useParams();
  const username = params.username;

  //fetch user
  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserByUsernameQuery(username);

  //fetch user rent post's
  const {
    data: userRentPosts,
    error: userRentPostsError,
    isLoading: userRentPostsIsLoading,
  } = useGetRentPostsByUsernameQuery(username || '');

  return (
    <div>
      <div>
        {userIsLoading ? (
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
            {userError ? (
              <ErrorPageComponent error={userError}></ErrorPageComponent>
            ) : (
              <Stack>
                <Card
                  direction={{ base: 'column', sm: 'row' }}
                  overflow="hidden"
                  variant="outline"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src={user?.image}
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">
                        {user?.firstName} {user?.lastName}
                      </Heading>

                      <Text py="2">{user?.username}</Text>
                      <Text py="2">{user?.email}</Text>
                    </CardBody>
                  </Stack>
                </Card>
                <Stack spacing={3} className="rent-post-heading">
                  <Text fontSize="6xl">{user?.username} Rent Posts</Text>
                </Stack>

                {userRentPostsIsLoading ? (
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
                  <div>
                    {userRentPosts?.length ? (
                      <div className="profile-post">
                        {userRentPosts.map((rentPost: IRentPostInterface) => (
                          <RentPostComponent
                            post={rentPost}
                            key={rentPost.id}
                          ></RentPostComponent>
                        ))}
                      </div>
                    ) : (
                      <Stack>
                        <Center h="80px" color="black">
                          <Text fontSize="4xl" fontWeight="700">
                            Empty
                          </Text>
                        </Center>
                      </Stack>
                    )}
                  </div>
                )}
              </Stack>
            )}
          </Stack>
        )}
      </div>
    </div>
  );
};
