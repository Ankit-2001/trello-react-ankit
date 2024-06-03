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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { deleteCard } from "../../Api";
import ChecklistInCard from "../Checklist/ChecklistInCard";

function CardDetails({ name, id, badges, deleteCurrentCardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function deleteCurrentCard() {
    deleteCard(id).then(() => {
      console.log("Card deleted successfully....");
      deleteCurrentCardData(id);
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
        {badges.checkItems ? (
          <Text ml="0.5rem">
            {badges.checkItemsChecked} / {badges.checkItems}
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

      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent minH="80vh">
          <ModalHeader>
            <Text>{name}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{<ChecklistInCard key={id} cardId={id} />}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardDetails;
