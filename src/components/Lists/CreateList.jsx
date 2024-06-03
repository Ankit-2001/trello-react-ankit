import React, { useRef, useState} from "react";
import { Box, Button, FormControl, Input, Flex, useToast } from "@chakra-ui/react";

import { createNewList } from "../../Api";

function CreateList({id,addNewList}) {
  const [formVisibility, setFormVisibility] = useState(false);
  const [inputValue, setInputValue] = useState(""); 

  const toast = useToast();
  const toastIdRef = useRef();



  const handleSubmit = () => {
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
      setInputValue(""); 
    }
    setFormVisibility((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
        <form onSubmit={handleSubmit}>
          <FormControl display="block">
            <Input
              _hover={{
                border: "1px solid black",
              }}
              border="1px solid black"
              mb="1rem"
              placeholder="Enter list title"
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

export default CreateList;

