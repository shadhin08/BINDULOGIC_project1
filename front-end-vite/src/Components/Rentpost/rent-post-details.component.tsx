import React, { useEffect } from 'react';
import {
  AbsoluteCenter,
  Box,
  Spinner,
  Stack,
  Image,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useFindRentPostsByIdQuery } from 'Redux/services/rent-post.redux-services';
import { ErrorPageComponent } from 'Components/ErrorPage/error-page.component';

interface RentPostDetailsComponentProps {}

export const RentPostDetailsComponent: React.FC<
  RentPostDetailsComponentProps
> = (props: RentPostDetailsComponentProps) => {
  const params = useParams();
  const id = params.id as string;
  const {
    data: rentPostDetails,
    error: rentPostDetailsError,
    isLoading,
  } = useFindRentPostsByIdQuery(id);

  console.log(rentPostDetails);
  const createdDate = String(rentPostDetails?.createdAt).split('T')[0];
  const updatedDate = String(rentPostDetails?.updatedAt).split('T')[0];

  return (
    <Stack>
      {isLoading ? (
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
          {rentPostDetailsError ? (
            <ErrorPageComponent
              error={rentPostDetailsError}
            ></ErrorPageComponent>
          ) : (
            <div className="flex-wrap">
              <Box>
                <Image src={rentPostDetails?.image} />
              </Box>
              <Stack className="rent-post-details-texts">
                <Text fontSize="5xl" as="b">
                  {rentPostDetails?.heading}
                </Text>

                <Text fontSize="sm" color={'gray'}>
                  {createdDate}
                </Text>
                <Text fontSize="lg" as="b">
                  {rentPostDetails?.rentAreaName}
                </Text>
                <Text fontSize="sm" color={'gray'}>
                  {rentPostDetails?.size} SqFt - Bed: {rentPostDetails?.bed} -
                  Bath: {rentPostDetails?.bath}
                </Text>

                <br />
                <Text fontSize="xl" as="b">
                  {rentPostDetails?.description}
                </Text>

                <Text fontSize="4xl" as="b">
                  BDT: {rentPostDetails?.rent} / month
                </Text>
                <Text fontSize="xl" color={'gray'}>
                  Last Update: {updatedDate}
                </Text>

                <Text fontSize="xl" as="b" className="flex">
                  Contact:-
                  <Link to={`/profile/${rentPostDetails?.userUsername}`}>
                    <Text color="blue.600">
                      {rentPostDetails?.userUsername}
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </div>
          )}
        </Stack>
      )}
    </Stack>
  );
};
