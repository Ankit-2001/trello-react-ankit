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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import CardDetails from "../Cards/CardDetails";
import CreateCard from "../Cards/CreateCard";
import { getCardData, deleteList } from "../../Api";


function ListContainer({ name, id, deleteCurrentListData }) {
  const [cardsData, setCardsData] = useState([]);
  const toast = useToast();
  const toastIdRef = useRef();

  useEffect(() => {
    getCardData(id)
      .then((card) => {
        setCardsData(card);
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
  }, []);

  const addNewCard = (newCard) => {
    setCardsData([...cardsData, newCard]);
  };

  const deleteCurrentCardData = (cardId) => {
    const remainingCards = cardsData.filter((data) => {
      if (data.id !== cardId) {
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
    deleteList(id)
      .then(() => {
        console.log("List deleted successfully.....");
        deleteCurrentListData(id);
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

  return (
    <Box minW="12rem" bg="gray" h="fit-content" p="2" borderRadius="md">
      <Flex mb="1rem" justifyContent="space-between" alignItems="center" px="2">
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
