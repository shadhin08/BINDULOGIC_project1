import React from "react";
import { AbsoluteCenter, Box, Center, Stack, Text } from "@chakra-ui/react";

interface ErrorPageComponentProps {
    error: any;
    // error:
    // {
    //     status?: string
    //     error?: string
    //     originalStatus?: number
    //     data?: string
    // } 
}

export const ErrorPageComponent : React.FC<ErrorPageComponentProps> = (props: ErrorPageComponentProps) => {
    return (
    <Stack>
        {props.error.originalStatus&&
        <Box position='relative' h='100px'>
            <AbsoluteCenter  p='4' color='red' axis='both'>
                <Text fontSize='7xl'>{props.error.originalStatus}</Text>
            </AbsoluteCenter>
            
        </Box>
        }

        <Center h='50px' color='red'>
            {props.error.status}
        </Center>

        {props.error.data&&
        <Center  color='black'>
            {props.error.data}
        </Center>
        }
        {!props.error.data&&
        <Center  h='100px' color='black'>
            {props.error.error}
        </Center>
        }
    </Stack>
    );
}