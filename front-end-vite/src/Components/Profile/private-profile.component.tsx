import React from 'react';
import Cookies from 'js-cookie';

import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Text,
  Image,
  Center,
  Box,
  AbsoluteCenter,
  Spinner,
} from '@chakra-ui/react';

import './Profile.css';
import { RentPostComponent } from '../Rentpost/rent-post.component';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { useGetUserByUsernameQuery } from 'Redux/services/user.redux-services';
import { useGetRentPostsByUsernameQuery } from 'Redux/services/rent-post.redux-services';
import { ErrorPageComponent } from 'Components/ErrorPage/error-page.component';
import { IRentPostInterface } from 'types';

interface PrivateProfileComponentProps {}

export const PrivateProfileComponent: React.FC<PrivateProfileComponentProps> = (
  props: PrivateProfileComponentProps,
) => {
  //get cookie for get the username which is set from backend
  const username = Cookies.get('username');

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

  //logout function for when someone clicked log out
  const handleLogOut = () => {
    Cookies.remove('username');
    window.location.replace('/login');
  };
  return (
    <Stack>
      <Stack>
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
                {/* -----------------------------------------------Profile up section----------------------------------------------- */}
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

                    <CardFooter>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={handleLogOut}
                      >
                        Log Out
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>

                {/* -----------------------------------------------Profile down section----------------------------------------------- */}

                <Link to={'/create-rent-post'}>
                  <Center h="80px" color="white">
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="teal"
                      variant="solid"
                      size="lg"
                    >
                      Create a rent post
                    </Button>
                  </Center>
                </Link>
                <Stack spacing={3} className="rent-post-heading">
                  <Text fontSize="6xl">Your Rent Posts</Text>
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
                        {userRentPosts?.map((rentPost: IRentPostInterface) => (
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
                        <Link to={'/create-rent-post'}>
                          <Center h="80px" color="white">
                            <Button
                              leftIcon={<AddIcon />}
                              colorScheme="teal"
                              variant="solid"
                              size="lg"
                            >
                              Create a new rent post
                            </Button>
                          </Center>
                        </Link>
                      </Stack>
                    )}
                  </div>
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
