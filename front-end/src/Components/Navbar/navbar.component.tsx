import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  AbsoluteCenter,
  Spinner,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { useGetUserByUsernameQuery } from 'Redux/services/user.redux-services';

interface NavbarComponentProps {}

export const NavbarComponent: React.FC<NavbarComponentProps> = (
  props: NavbarComponentProps,
) => {
  const { colorMode, toggleColorMode } = useColorMode();

  //get cookie for get the username which is set from backend
  const username = Cookies.get('username');

  //fetch user
  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserByUsernameQuery(username);

  const handleLogOut = () => {
    Cookies.remove('username');
    window.location.replace('/login');
  };

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        className="navbar"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to="/">
            <Box>Rent IN</Box>
          </Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {username ? (
                <Stack>
                  {userIsLoading ? (
                    <Box position="relative" h="40px" w="40px">
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
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}
                      >
                        <Avatar size={'sm'} src={user?.image} />
                      </MenuButton>
                      <MenuList alignItems={'center'}>
                        <br />
                        <Center>
                          <Avatar size={'2xl'} src={user?.image} />
                        </Center>
                        <br />
                        <Center>
                          <p>{user?.username}</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <Link to="/profile">
                          <MenuItem>Profile</MenuItem>
                        </Link>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                      </MenuList>
                      <Outlet />
                    </Menu>
                  )}
                </Stack>
              ) : (
                <Link to="/login">
                  <Button colorScheme="teal" variant="outline">
                    Log in
                  </Button>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
