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

function CreateCard({ id, addNewCard }) {
  const [formVisibility, setFormVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const toastIdRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      createNewCard(id, inputValue)
        .then((data) => {
          addNewCard(data);
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
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Box h="max-content" w="11rem" bg="gray.300" borderRadius="md" mt="0.5rem">
      <Button
        bg="blue.300"
        color="white"
        _hover={{ bg: "blue.300" }}
        display={formVisibility ? "none" : "block"}
        w="full"
        onClick={() => {
          setFormVisibility((prev) => !prev);
        }}
      >
        Create new card
      </Button>
      {formVisibility && (
        <form onSubmit={handleSubmit}>
          <FormControl display="block" p="2">
            <Input
              autoFocus
              _hover={{
                border: "1px solid black",
              }}
              border="1px solid black"
              mb="1rem"
              placeholder="Enter card title"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Flex gap="1rem" mt="1rem">
              <Button type="submit">Create</Button>
              <Button
                id="close"
                type="button"
                onClick={() => {
                  setFormVisibility((prev) => !prev);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </FormControl>
        </form>
      )}
    </Box>
  );
}

export default CreateCard;
