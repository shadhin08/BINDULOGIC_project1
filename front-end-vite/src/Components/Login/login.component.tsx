import React, { useEffect } from 'react';
import {
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Alert,
  AlertIcon,
  Spinner,
  Center,
} from '@chakra-ui/react';
import './Login.css';
import { IErrorInterface, IUserCredentialsInterface } from 'types';
import { useUserLogInMutation } from 'Redux/services/login.redux-services';
import { Link } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { UserCredentialsSchema } from 'zod-types';

interface LoginComponentProps {}

export const LoginComponent: React.FC<LoginComponentProps> = (
  props: LoginComponentProps,
) => {
  const [
    userLogIn,
    {
      data: loginDataFromDb,
      error: logInErrorFromDb,
      isLoading: isLogInLoading,
    },
  ] = useUserLogInMutation();

  const [show, setShow] = React.useState<Boolean>(false);
  const [inputUsername, setInputUsername] = React.useState<string>('');
  const [inputPassword, setInputPassword] = React.useState<string>('');

  //errors

  const [logInError, setLogInError] = React.useState<IErrorInterface>({
    success: null,
    message: '',
  });

  useEffect(() => {
    if (logInErrorFromDb) {
      if ('status' in logInErrorFromDb) {
        const errorMessage =
          'data' in logInErrorFromDb
            ? (logInErrorFromDb.data as string)
            : (logInErrorFromDb.error as string);
        setLogInError({
          success: false,
          message: errorMessage,
        });
      }
    } else if (loginDataFromDb) {
      setLogInError({ success: true, message: 'Loged in successfully...' });
      window.location.replace('/profile');
    }
  }, [isLogInLoading]);
  const handleShowClick = () => setShow(!show);

  const handleLoginClick = async () => {
    if (!inputUsername.length || !inputPassword.length) {
      setLogInError({
        success: false,
        message: "Username and password can't be empty.",
      });
      return;
    }

    const userCredentials: IUserCredentialsInterface = {
      username: inputUsername,
      password: inputPassword,
    };

    try {
      UserCredentialsSchema.parse(userCredentials);
      await userLogIn(userCredentials);
    } catch (error) {
      setLogInError({ success: false, message: 'Zod validation error' });
    }
  };

  return (
    <div>
      <Stack spacing={3} className="rent-post-heading">
        <Text fontSize="4xl">Log in</Text>
      </Stack>
      <Stack spacing={4} className="login-input">
        <InputGroup>
          <InputRightElement pointerEvents="none"></InputRightElement>
          <Input
            placeholder="Enter Username"
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'Password'}
            placeholder="Enter Password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {!isLogInLoading && (
          <Button colorScheme="blue" onClick={handleLoginClick}>
            Log in
          </Button>
        )}

        {isLogInLoading && (
          <Stack spacing={3} className="align-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        )}

        <Stack spacing={3}>
          {logInError.success === false && (
            <Alert status="error">
              <AlertIcon />
              {logInError.message}
            </Alert>
          )}

          {logInError.success === true && (
            <Alert status="success">
              <AlertIcon />
              {logInError.message}
            </Alert>
          )}
        </Stack>

        <Stack spacing={3} className="rent-post-heading">
          <Text fontSize="4xl">Or</Text>
        </Stack>
        <Link to={'/signup'}>
          <Center h="80px" color="white">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="solid"
              size="lg"
            >
              Create a profile
            </Button>
          </Center>
        </Link>
      </Stack>
    </div>
  );
};
