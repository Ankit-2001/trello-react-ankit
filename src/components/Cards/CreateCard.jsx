import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { createNewCard } from "../../Api";
import Form from "../../Form";

function CreateCard({ id, addNewCard }) {
  const [formVisibility, setFormVisibility] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef();

  const handleSubmitForm = (inputValue) => {
    if (inputValue) {
      createNewCard(id, inputValue)
        .then((response) => {
          addNewCard(response.data);
        })
        .catch((err) => {
          toastIdRef.current = toast({
            duration: 1000,
            isClosable: true,
            position: "top-right",
            status: "error",
            description: `${err.message} :could not ${err.config.method} ${err.config.url}`,
          });
        });
    }
  };

  const handleFormVisibility = () => {
    setFormVisibility((prev) => !prev);
  };

  return (
    <Box h="max-content" w="11rem" bg="gray.300" borderRadius="md" mt="0.5rem">
      <Button
        bg="blue.300"
        color="white"
        _hover={{ bg: "blue.300" }}
        display={formVisibility ? "none" : "block"}
        w="full"
        onClick={handleFormVisibility}
      >
        Create new card
      </Button>
      {formVisibility && (
        <Form
          handleSubmitForm={handleSubmitForm}
          handleFormVisibility={handleFormVisibility}
        />
      )}
    </Box>
  );
}

export default CreateCard;
