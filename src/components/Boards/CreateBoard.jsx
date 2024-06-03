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
  useToast
} from "@chakra-ui/react";

import { createNewBoard } from "../../Api";

export default function CreateBoard({ addNewBoards }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const initialRef = useRef(null);
  const toast = useToast();
  const toastIdRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(inputValue);
    if (inputValue) {
      createNewBoard(inputValue)
        .then((response) => {
          addNewBoards([response.data]);
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
          <form onSubmit={handleSubmit}>
            <FormControl bg="white" color="black" borderRadius="md">
              <ModalBody pb={6}>
                <Input
                  ref={initialRef}
                  value={inputValue}
                  onChange={handleInputChange}
                />

                {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" type="submit" mr={3}>
                  Create
                </Button>
                <Button onClick={onClose} colorScheme="blue">
                  Cancel
                </Button>
              </ModalFooter>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
