import {
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import {
  createChecklist,
  createNewCheckitem,
  deleteCard,
  deleteCheckitem,
  deleteChecklist,
  getChecklists,
  updateCheckitem,
} from "../../Api";
import ChecklistInCard from "../Checklist/ChecklistInCard";
import { useEffect, useRef, useState } from "react";
import ChecklistData from "../Checklist/ChecklistData";

function CardDetails({ name, id, deleteCurrentCardData }) {
  const [checklists, setCheckLists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const toastIdRef = useRef();

  useEffect(() => {
    getChecklists(id)
      .then((response) => {
        setCheckLists(response.data);
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

  //adding of new checklist
  const addNewChecklist = (inputValue) => {
    createChecklist(id, inputValue)
      .then((response) => {
        console.log("Checklist created successfully...");
        setCheckLists([...checklists, response.data]);
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
  };

  //deletion of checklist
  const deleteCurrentChecklist = (checklistId) => {
    deleteChecklist(id, checklistId)
      .then((response) => {
        console.log(`${checklistId} deleted successfully`);
        setCheckLists(response.data);
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
  };

  //adding of checkitems
  const additemToChecklist = (checkitemId, inputValue) => {
    let requiredChecklist = [];
    createNewCheckitem(checkitemId, inputValue)
      .then((response) => {
        const checkItem = response.data;
        requiredChecklist = checklists.find(
          (checklist) => checklist.id === checkItem.idChecklist
        );
        setCheckLists(
          checklists.map((checklistData) => {
            if (checklistData.id === requiredChecklist.id) {
              return {
                ...checklistData,
                checkItems: [...checklistData.checkItems, checkItem],
              };
            } else {
              return checklistData;
            }
          })
        );
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
  };

  //Checked change implementation
  const handleCheckitemChange = (checklistId, checkitemId, State) => {
    if (State === "complete") {
      updateCheckitem(id, checkitemId, "incomplete");
    } else {
      updateCheckitem(id, checkitemId, "complete");
    }
    setCheckLists(
      checklists.map((checklistData) => {
        if (checklistData.id === checklistId) {
          const copyCheckitems = checklistData.checkItems.map((items) => {
            if (items.id === checkitemId) {
              return {
                ...items,
                state: `${State === "complete" ? "incomplete" : "complete"}`,
              };
            } else {
              return items;
            }
          });
          return {
            ...checklistData,
            checkItems: [...copyCheckitems],
          };
        } else {
          return checklistData;
        }
      })
    );
  };

  //deletion of checkites
  const currentCheckitemDelete = (checklistId, checkitemId) => {
    deleteCheckitem(checklistId, checkitemId)
      .then(() => {
        console.log("Checkitems deleted successfully...");
        setCheckLists(
          checklists.map((checklistData) => {
            if (checklistData.id === checklistId) {
              const copyCheckitems = checklistData.checkItems.filter(
                (items) => items.id !== checkitemId
              );
              return {
                ...checklistData,
                checkItems: [...copyCheckitems],
              };
            } else {
              return checklistData;
            }
          })
        );
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
  };

  let totalChecked = 0,
    totalcheckItems = 0;
  checklists.forEach((checklist) => {
    checklist.checkItems?.forEach((item) => {
      totalcheckItems += 1;
      if (item.state === "complete") {
        totalChecked += 1;
      }
    });
  });

  //All checklist in a card
  const allCheckListInCard = checklists.map((checklist) => {
    return (
      <ChecklistData
        key={checklist.id}
        {...checklist}
        deleteCurrentChecklist={deleteCurrentChecklist}
        additemToChecklist={additemToChecklist}
        handleCheckitemChange={handleCheckitemChange}
        currentCheckitemDelete={currentCheckitemDelete}
      />
    );
  });

  function deleteCurrentCard() {
    deleteCard(id)
      .then(() => {
        console.log("Card deleted successfully....");
        deleteCurrentCardData(id);
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
    <>
      <Button
        onClick={onOpen}
        bg="white"
        color="gray.600"
        w="11rem"
        display="flex"
        justifyContent="space-between"
        mt="0.5rem"
        className="card-details-btn"
      >
        <Text>{name}</Text>
        {totalcheckItems ? (
          <Text ml="0.5rem">
            {totalChecked} / {totalcheckItems}
          </Text>
        ) : (
          <></>
        )}
        <Popover placement="right">
          <PopoverTrigger>
            <Button
              as="p"
              onClick={(e) => {
                e.stopPropagation();
              }}
              p="0"
              h="2rem"
              bg="none"
              _hover={{
                bg: "none",
              }}
            >
              <FontAwesomeIcon className="delete-card-btn" icon={faEllipsis} />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content">
            <Button
              as="p"
              bg="red"
              color="white"
              _hover={{ bg: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                deleteCurrentCard();
              }}
            >
              Archieve the card
            </Button>
          </PopoverContent>
        </Popover>
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size="xl">
        <ModalOverlay />
        <ModalContent minH="80vh">
          <ModalHeader>
            <Text>{name}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              <ChecklistInCard
                key={id}
                allCheckListInCard={allCheckListInCard}
                addNewChecklist={addNewChecklist}
              />
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardDetails;
