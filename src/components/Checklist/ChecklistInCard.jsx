import {
  Box,
  Flex,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function ChecklistInCard({ allCheckListInCard, addNewChecklist }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //adding new Checklist
  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue) {
      addNewChecklist(inputValue);
      setInputValue("");
    }
  }

  return (
    <Flex>
      <Box flexGrow={3}>{allCheckListInCard}</Box>
      <Flex direction="column" ml="0.25rem">
        <Text>Add to Card</Text>
        <Popover placement="bottom" >
          <PopoverTrigger>
            <Button>Add Checklist</Button>
          </PopoverTrigger>
          <PopoverContent >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Add checkList</PopoverHeader>
            <PopoverBody>
              <Flex>
                <form onSubmit={handleSubmit}>
                  <Text mb="0.25rem">Title</Text>
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    mb="1rem"
                  />
                  <Button w="fit-content" bg="blue.200" type="submit">
                    Add
                  </Button>
                </form>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}

export default ChecklistInCard;
