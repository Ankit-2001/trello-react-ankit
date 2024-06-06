import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Form({ handleSubmitForm, handleFormVisibility }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitForm(inputValue);
    setInputValue("")
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
      <form onSubmit={handleSubmit}>
        <FormControl display="block" p="2">
          <Input
            autoFocus
            _hover={{
              border: "1px solid black",
            }}
            border="1px solid black"
            mb="1rem"
            placeholder="Enter title"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Flex gap="1rem" mt="1rem">
            <Button id="close" type="button" onClick={handleFormVisibility}>
              Cancel
            </Button>
            <Button type="submit" bg="green.400">
              Create
            </Button>
          </Flex>
        </FormControl>
      </form>
  );
}
