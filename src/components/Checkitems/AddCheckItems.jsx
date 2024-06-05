import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import Form from "../../Form";

function AddCheckitems({ id, additemToChecklist }) {
  const [formVisibility, setFormVisibility] = useState(false);

  //adding checkitems to checklist
  const handleSubmitForm = (inputValue) => {
    if (inputValue) {
      additemToChecklist(id, inputValue);
    }
  };

  const handleFormVisibility = () => {
    setFormVisibility((prev) => !prev);
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
        <Form
          handleSubmitForm={handleSubmitForm}
          handleFormVisibility={handleFormVisibility}
        />
      )}
    </Box>
  );
}

export default AddCheckitems;
