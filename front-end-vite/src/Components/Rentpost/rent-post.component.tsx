import React from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './rent-post.css';

export interface RentPostComponentProps {
  post: {
    id?: string;
    heading: string;
    description: string;
    rent: number;
    bed: number;
    bath: number;
    size: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
    userUsername?: string;
    rentAreaName: string;
  };
}

export const RentPostComponent: React.FC<RentPostComponentProps> = (
  props: RentPostComponentProps,
) => {
  const property = {
    imageUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Rear view of modern home with pool',
    beds: props.post.bed,
    baths: props.post.bath,
    title: props.post.heading,
    formattedPrice: props.post.rent,
    area: props.post.size,
    author: props.post.userUsername,
    image: props.post.image,
  };

  return (
    <div className="rent-post">
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Link to={`/rent-post/${props.post.id}`}>
          <Image
            src={property.image || property.imageUrl}
            alt={property.imageAlt}
          />
        </Link>

        <Box p="6">
          <Link to={`/rent-post/${props.post.id}`}>
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {property.beds} beds &bull; {property.baths} baths
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.title}
            </Box>
          </Link>
          <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / month
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="0" color="gray.600" fontSize="sm">
              Area: {property.area} Sq ft
            </Box>
          </Box>
          <Link to={`/profile/${property.author}`}>
            <Box as="span" ml="0" color="blue.600" fontSize="sm">
              {' '}
              {property.author}{' '}
            </Box>
          </Link>
        </Box>
      </Box>
    </div>
  );
};
