import { useState } from "react";
import { Box,Button,FormControl,Input,Flex } from "@chakra-ui/react";

import {createNewCheckitem} from "../../Api"


function AddCheckitems({id,addNewCheckitems}){
    const [formVisibility, setFormVisibility] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      if (inputValue) {
        console.log(id);
        createNewCheckitem(id, inputValue).then((data) => {
          console.log("Checkitem created successfully...");
          addNewCheckitems(data);
        });
        setInputValue("");
      }
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    return (
      <Box h="max-content" w="fit-content" borderRadius="md">
        <Button
          display={formVisibility ? "none" : "block"}
          w="full"
          onClick={() => {
            setFormVisibility((prev) => !prev);
          }}
        >
          Add an item
        </Button>
        {formVisibility && (
          <form onSubmit={handleSubmit}>
            <FormControl display="block">
              <Input
                _hover={{
                  border: "1px solid black",
                }}
                w="13rem"
                border="1px solid black"
                mb="0.5rem"
                placeholder="Enter checkitems"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Flex gap="1rem" >
                <Button type="submit">Add</Button>
                <Button
                  id="close"
                  type="button"
                  onClick={() => {
                    setFormVisibility((prev) => !prev);
                  }}
                >
                  X
                </Button>
              </Flex>
            </FormControl>
          </form>
        )}
      </Box>
    );

}

export default AddCheckitems;