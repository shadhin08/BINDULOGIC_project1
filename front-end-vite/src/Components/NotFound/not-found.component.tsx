import React from "react";
import { Stack } from "@chakra-ui/react";

interface NotFoundComponentProps {

}

export const NotFoundComponent : React.FC<NotFoundComponentProps> = (props: NotFoundComponentProps) => {
    return (<Stack>404</Stack>);
}