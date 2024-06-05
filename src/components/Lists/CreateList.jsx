import React, { useRef, useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";

import { createNewList } from "../../Api";
import Form from "../../Form";

function CreateList({ id, addNewList }) {
  const [formVisibility, setFormVisibility] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef();

  const handleFormVisibility = () => {
    setFormVisibility((prev) => !prev);
  };

  const handleSubmitForm = (inputValue) => {
    if (inputValue) {
      createNewList(id, inputValue)
        .then((response) => addNewList([response.data]))
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

  return (
    <Box h="max-content" w="12rem" bg="gray.300" p="2" borderRadius="md">
      <Button
        display={formVisibility ? "none" : "block"}
        w="full"
        onClick={() => {
          setFormVisibility((prev) => !prev);
        }}
      >
        Add another list
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

export default CreateList;
