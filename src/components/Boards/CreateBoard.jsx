import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
} from "@chakra-ui/react";

import { createNewBoard } from "../../Api";

export default function CreateBoard({ addNewBoards }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const initialRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    setInputValue(inputValue);
    if (inputValue) {
      createNewBoard(inputValue).then((response) => {
        addNewBoards([response.data]);
      });
      setInputValue("");
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} bg="blue.200" h="6rem" w="12rem">
        Create new board
      </Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="gray.200" w="20rem">
          <ModalHeader>Enter your boards name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl bg="white" color="black" borderRadius="md">
              <Input
                ref={initialRef}
                value={inputValue}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={handleSaveClick}
              mr={3}
            >
              Create
            </Button>
            <Button onClick={onClose} colorScheme="blue">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}