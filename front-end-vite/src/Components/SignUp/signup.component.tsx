import React, { useEffect } from 'react';
import {
  Input,
  Stack,
  Button,
  Text,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import { IErrorInterface, IUserInterface } from 'types';
import { useUserSignUpMutation } from 'Redux/services/signup.redux-services';
import { UserSchema } from 'zod-types';

interface SignupComponentProps {}

export const SignupComponent: React.FC<SignupComponentProps> = (
  props: SignupComponentProps,
) => {
  const [
    userSignup,
    { data: signUpData, error: signUpErrorFromDb, isLoading: isSignUpLoading },
  ] = useUserSignUpMutation();

  // sign up data
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [base64Image, setBase64Image] = React.useState<string>('');
  //errors
  const [imageError, setImageError] = React.useState<IErrorInterface>({
    success: null,
    message: '',
  });
  const [signUpError, setSignUpError] = React.useState<IErrorInterface>({
    success: null,
    message: '',
  });

  useEffect(() => {
    if (signUpErrorFromDb) {
      if ('status' in signUpErrorFromDb) {
        const errorMessage =
          'data' in signUpErrorFromDb
            ? (signUpErrorFromDb.data as string)
            : (signUpErrorFromDb.error as string);
        setSignUpError({
          success: false,
          message: errorMessage,
        });
      }
    } else if (signUpData) {
      setSignUpError({
        success: true,
        message: 'Profile created successfully.',
      });
      window.location.replace('/profile');
    }
  }, [isSignUpLoading]);

  const handleSignUpClick = async () => {
    setSignUpError({ success: null, message: '' });

    const image = base64Image;
    if (
      !firstName.length ||
      !lastName.length ||
      !username.length ||
      !email.length ||
      !password.length
    ) {
      setSignUpError({
        success: false,
        message: `${!firstName.length ? '[First name] ' : ''} ${
          !lastName.length ? '[Last name] ' : ''
        } ${!username.length ? '[Username] ' : ''} ${
          !email.length ? '[Email] ' : ''
        } ${!password.length ? '[Password] ' : ''} can't be empty.`,
      });
      return;
    }

    if (image.length) {
      const userData: IUserInterface = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        image: image,
      };

      try {
        UserSchema.parse(userData);
        await userSignup(userData);
      } catch (error: any) {
        console.log(error);
        setSignUpError({ success: false, message: 'Zod validation failed' });
      }
    } else {
      setImageError({ success: false, message: 'Image not found' });
    }
  };

  const loadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const image = event.target.files ? event.target.files[0] : null;

      const maxSize = 100000;
      if (image && image.size > maxSize) {
        // console.log('Image too large');
        setImageError({
          success: false,
          message: 'Image is too laege. maximum image size is 100kb',
        });
        setBase64Image('');
      } else if (image) {
        setImageError({ success: true, message: 'Image accepted' });
        const base64 = await convertBase64(image);
        // console.log(base64);
        setBase64Image(base64 as string);
      } else {
        setImageError({ success: false, message: 'Image not found' });
      }
    }
  };
  const convertBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        setImageError({ success: false, message: 'Image conversion failed.' });
        reject(error);
      };
    });
  };
  return (
    <Stack>
      <Stack spacing={3} className="rent-post-heading">
        <Text fontSize="4xl">Sign Up</Text>
      </Stack>

      <Stack className="create-new-rent-post">
        <h1 className="create-new-rent-post-input-heading">First Name</h1>
        <Input
          placeholder="First Name"
          className="create-new-rent-post-input"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <h1 className="create-new-rent-post-input-heading">Last Name</h1>
        <Input
          placeholder="Last Name"
          className="create-new-rent-post-input"
          onChange={(e) => setLastName(e.target.value)}
        />

        <h1 className="create-new-rent-post-input-heading">Username</h1>
        <Input
          placeholder="Username"
          className="create-new-rent-post-input"
          onChange={(e) => setUsername(e.target.value)}
        />

        <h1 className="create-new-rent-post-input-heading">Email</h1>
        <Input
          placeholder="Email"
          className="create-new-rent-post-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <h1 className="create-new-rent-post-input-heading">Password</h1>
        <Input
          placeholder="Password"
          className="create-new-rent-post-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <h1 className="create-new-rent-post-input-heading">Profile picture</h1>
        <Input
          required
          type="file"
          accept=".png, .jpg"
          className="create-new-rent-post-input"
          onChange={(e) => loadImage(e)}
        />

        <Stack spacing={3}>
          {imageError.success === false && (
            <Alert status="error">
              <AlertIcon />
              {imageError.message}
            </Alert>
          )}

          {imageError.success === true && (
            <Alert status="success">
              <AlertIcon />
              {imageError.message}
            </Alert>
          )}
        </Stack>
        <Stack spacing={3}>
          {signUpError.success === false && (
            <Alert status="error">
              <AlertIcon />
              {signUpError.message}
            </Alert>
          )}

          {signUpError.success === true && (
            <Alert status="success">
              <AlertIcon />
              {signUpError.message}
            </Alert>
          )}
        </Stack>

        {!isSignUpLoading && (
          <Button colorScheme="blue" onClick={handleSignUpClick}>
            Sign Up
          </Button>
        )}

        {isSignUpLoading && (
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
      </Stack>
    </Stack>
  );
};
