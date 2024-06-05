import { Button, Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function CheckitemsData({
  name,
  id,
  idChecklist,
  state,
  handleCheckitemChange,
  currentCheckitemDelete,
}) {
  
  //checkitems state change
  function handleChange() {
    handleCheckitemChange(idChecklist, id, state);
  }

  //deletion of checkitem
  function handleDelete() {
    currentCheckitemDelete(idChecklist, id);
  }

  return (
    <Flex gap="1rem" mb="0.5rem" alignItems="center">
      <Checkbox isChecked={state === "complete"} onChange={handleChange} />
      <Text>{name}</Text>
      <Spacer />
      <Button bg="none" _hover={{ bg: "none" }} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Flex>
  );
}

export default CheckitemsData;
