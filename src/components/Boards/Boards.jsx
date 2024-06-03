import { useState } from "react";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";


import BoardContainer from "./BoardContainer";
import CreateBoard from "./CreateBoard";

function Boards() {
  const [boards, setBoards] = useState([]);
  const addNewBoards = (newBoard) => {
    setBoards([...boards, ...newBoard]);
  };
  return (
    <Box mt="4rem" mx="auto" w="55vw">
      <Box>
        <Heading as="h2" color="gray.400" mb="2rem" fontSize="1.5rem">
          Ankit kumar's Workspace
        </Heading>
        <Divider borderColor="black" borderWidth="1px" />
      </Box>
      <Box mt="2rem">
        <Text mb="1rem">Your boards</Text>
        <Flex wrap="wrap" gap="2rem">
          <BoardContainer boards={boards} addNewBoards={addNewBoards} />
          <CreateBoard addNewBoards={addNewBoards} />
        </Flex>
      </Box>
    </Box>
  );
}

export default Boards;
