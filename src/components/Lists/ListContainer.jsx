import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
} from "@chakra-ui/react";

import CardDetails from "../Cards/CardDetails";
import CreateCard from "../Cards/CreateCard";
import { getCardData, deleteList } from "../../Api";

function ListContainer({ name, id, deleteCurrentListData }) {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    getCardData(id).then((card) => {
      setCardsData(card);
    });
  }, []);

  const addNewCard = (newCard) => {
    setCardsData([...cardsData, newCard]);
  };

  

  const deleteCurrentCardData = (cardId) => {
    const remainingCards = cardsData.filter((data) => {
      if (data.id != cardId) {
        return true;
      }
    });

    setCardsData(remainingCards);
  };

  const allCards = cardsData.map((card) => (
    <CardDetails
      key={card.id}
      {...card}
      deleteCurrentCardData={deleteCurrentCardData}
    />
  ));

  function deleteCurrentList() {
    deleteList(id).then(() => {
      console.log("List deleted successfully.....");
      deleteCurrentListData(id);
    });
  }

  return (
    <Box
      minW="12rem"
      bg="gray"
      h="fit-content"
      p="2"
      borderRadius="md"
    >
      <Flex mb="1rem" justifyContent="space-between" alignItems="center" px= "2">
        <Heading as="h3" fontSize="1rem" color="white">
          {name}
        </Heading>
        <Popover placement="right">
          <PopoverTrigger>
            <Button
              h="2rem"
              bg="none"
              _hover={{
                bg: "none",
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="12rem">
              <PopoverArrow />
              <PopoverHeader>List option</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button colorScheme="red" onClick={deleteCurrentList}>
                  Delete this list
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
      {allCards}
      <CreateCard key={id} id={id} addNewCard={addNewCard} />
    </Box>
  );
}

export default ListContainer;
