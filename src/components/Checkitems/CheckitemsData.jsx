import { Box, Button, Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { deleteCheckitem, updateCheckitem } from "../../Api";

function CheckitemsData({
  name,
  id,
  idChecklist,
  state,
  idCard,
  deleteCurrentCheckitem,
}) {
  const [currentState, setCurrentState] = useState(state);

  function handleChange() {
    if (state === "complete") {
      setCurrentState("incomplete");
      updateCheckitem(idCard, id, "incomplete").then((data) =>
        console.log(data)
      );
    } else {
      setCurrentState("complete");
      console.log(state, idCard);
      updateCheckitem(idCard, id, "complete").then((data) => console.log(data));
    }
  }

  function handleDelete() {
    deleteCheckitem(idChecklist, id).then(() => {
      console.log("Checkitems deleted successfully...");
    });
    deleteCurrentCheckitem(id);
  }

  return (
    <Flex gap="1rem" mb="0.5rem" alignItems="center">
      <Checkbox
        isChecked={currentState === "complete"}
        onChange={handleChange}
      />
      <Text>{name}</Text>
      <Spacer />
      <Button bg="none" _hover={{ bg: "none" }} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Flex>
  );
}

export default CheckitemsData;
