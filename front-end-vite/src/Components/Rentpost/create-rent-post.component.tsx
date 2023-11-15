import React, { useEffect } from 'react';
import { IErrorInterface, IRentPostInterface } from 'types';
import Cookies from 'js-cookie';
import {
  Stack,
  Button,
  Text,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import {
  useCreateRentPostMutation,
  useGetAllRentAreasQuery,
} from 'Redux/services/rent-post.redux-services';
import { RentPostSchema } from 'zod-types';
import { fromZodError } from 'zod-validation-error';

interface CreateRentPostComponentProps {}

export const CreateRentPostComponent: React.FC<CreateRentPostComponentProps> = (
  props: CreateRentPostComponentProps,
) => {
  //create a redux post
  const [
    newRentPost,
    {
      data: rentPostDataFromDb,
      error: rentPostErrorFromDb,
      isLoading: isRentPostLoading,
    },
  ] = useCreateRentPostMutation();

  const { data: rentAreas } = useGetAllRentAreasQuery('');

  //for store logedin user
  const [logedInUser, setLogedInUser] = React.useState<string>();

  //for rent post----------------------------------------------
  const [rentPostHeading, setRentPostHeading] = React.useState<string>('');
  const [rentPostDescription, setRentPostDescription] =
    React.useState<string>('');
  const [rentPostBath, setRentPostBath] = React.useState<number>(1);
  const [rentPostBed, setRentPostBed] = React.useState<number>(1);
  const [rentPostSize, setRentPostSize] = React.useState<number>(1);
  const [rentPostLocation, setRentPostLocation] = React.useState<string>('');
  const [base64image, setBase64Image] = React.useState<string>('');
  const [rentValue, setRentValue] = React.useState<string>('0.00');

  //for errors----------------------------------------------
  const [imageError, setImageError] = React.useState<IErrorInterface>({
    success: null,
    message: '',
  });
  const [rentPostError, setRentPostError] = React.useState<IErrorInterface>({
    success: null,
    message: '',
  });
  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, '');

  useEffect(() => {
    const username = Cookies.get('username');
    setLogedInUser(username);
  }, [logedInUser]);

  useEffect(() => {
    if (rentPostErrorFromDb) {
      if ('status' in rentPostErrorFromDb) {
        const errorMessage =
          'data' in rentPostErrorFromDb
            ? (rentPostErrorFromDb.data as string)
            : (rentPostErrorFromDb.error as string);
        setRentPostError({
          success: false,
          message: errorMessage,
        });
      }
    } else if (rentPostDataFromDb) {
      setRentPostError({
        success: true,
        message: 'Post created successfully.',
      });
      window.location.replace('/profile');
    }
  }, [isRentPostLoading]);

  const handleRentPostClick = async () => {
    setRentPostError({ success: null, message: '' });

    if (
      !rentPostHeading.length ||
      !rentPostDescription.length ||
      !rentPostLocation.length
    ) {
      setRentPostError({
        success: false,
        message: `${!rentPostHeading.length ? '[Heading] ' : ''} ${
          !rentPostDescription.length ? '[description] ' : ''
        } ${!rentPostLocation.length ? '[Location] ' : ''} can't be empty`,
      });
      return;
    }

    if (base64image.length) {
      //--------------------------------------------------------------------for Redux post
      const postBody: IRentPostInterface = {
        heading: rentPostHeading,
        description: rentPostDescription,
        rent: Number(rentValue),
        bed: rentPostBed,
        bath: rentPostBath,
        size: rentPostSize,
        rentAreaName: rentPostLocation,
        image: base64image,
      };

      try {
        RentPostSchema.parse(postBody);
        await newRentPost(postBody);
      } catch (error: any) {
        // console.log(error);
        setRentPostError({ success: false, message: 'Zod validation failed' });
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
        reject(error);
      };
    });
  };

  return (
    <Stack className="create-new-rent-post">
      <Stack spacing={3} className="rent-post-heading">
        <Text fontSize="4xl">Create Rent Post</Text>
      </Stack>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Post heading
      </Text>
      <Input
        placeholder="Heading"
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostHeading(e.target.value)}
      />

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Post description
      </Text>
      <Textarea
        placeholder="Post description"
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostDescription(e.target.value)}
      />

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Rent
      </Text>
      <NumberInput
        className="create-new-rent-post-input"
        onChange={(valueString) => setRentValue(parse(valueString))}
        value={format(rentValue)}
        min={0}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Bath
      </Text>
      <NumberInput
        step={5}
        defaultValue={1}
        min={1}
        max={10}
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostBath(Number(e))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Bed
      </Text>
      <NumberInput
        step={5}
        defaultValue={1}
        min={1}
        max={10}
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostBed(Number(e))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Size (Sq ft)
      </Text>
      <NumberInput
        step={5}
        defaultValue={1}
        min={1}
        max={10000}
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostSize(Number(e))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Location
      </Text>
      <Select
        placeholder="Select your location"
        className="create-new-rent-post-input"
        onChange={(e) => setRentPostLocation(e.target.value)}
      >
        {rentAreas &&
          rentAreas.map((rentArea) => (
            <option key={rentArea.id}>{rentArea.area}</option>
          ))}
      </Select>

      <Text fontSize="1xl" className="create-new-rent-post-input-heading">
        Image
      </Text>
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
        {rentPostError.success === false && (
          <Alert status="error">
            <AlertIcon />
            {rentPostError.message}
          </Alert>
        )}

        {rentPostError.success === true && (
          <Alert status="success">
            <AlertIcon />
            {rentPostError.message}
          </Alert>
        )}
      </Stack>

      {!isRentPostLoading && (
        <Button colorScheme="blue" onClick={handleRentPostClick}>
          Post
        </Button>
      )}

      {isRentPostLoading && (
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
  );
};
