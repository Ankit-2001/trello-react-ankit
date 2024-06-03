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
import { useState, useEffect } from "react";

import ChecklistData from "./ChecklistData";
import { createChecklist, getChecklists } from "../../Api";

function ChecklistInCard({ cardId }) {
  const [checkLists, setCheckLists] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getChecklists(cardId).then((data) => {
      setCheckLists(data);
    });
  }, []);

  const deleteCurrentChecklist = (checklistsData) => {
    // console.log(checklistsData)
    setCheckLists(checklistsData);
  };

  const allCheckListInCard = checkLists.map((checklist) => {
    // console.log(checklist);
    return (
      <ChecklistData
        key={checklist.id}
        {...checklist}
        deleteCurrentChecklist={deleteCurrentChecklist}
      />
    );
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue) {
      createChecklist(cardId, inputValue).then((data) => {
        console.log("Checklist created successfully...");
        console.log(data);
        setCheckLists([...checkLists,data]);
        setInputValue("");
      });
    }
  }

  return (
    <Flex>
      <Box flexGrow={3}>{allCheckListInCard}</Box>
      <Flex direction="column" ml="0.25rem">
        <Text>Add to Card</Text>
        <Popover offset={[-10, 10]} placement="bottom">
          <PopoverTrigger>
            <Button>Add Checklist</Button>
          </PopoverTrigger>
          <PopoverContent maxW="200px">
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
