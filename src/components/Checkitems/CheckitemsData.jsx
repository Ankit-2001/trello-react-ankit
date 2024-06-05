import { Button, Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import { deleteCheckitem, updateCheckitem } from "../../Api";
import CheckItemsContext from "../CheckitemContext";

function CheckitemsData({
  name,
  id,
  idChecklist,
  state,
  idCard,
  deleteCurrentCheckitem,
  handleCheckedChange,
}) {

  const {updateTotalCheckitems}  = useContext(CheckItemsContext);
  function handleChange() {
    if (state === "complete") {
      updateCheckitem(idCard, id, "incomplete");
      handleCheckedChange(id);
    } else {
      updateCheckitem(idCard, id, "complete");
      handleCheckedChange(id);
    }
  }

  function handleDelete() {
    deleteCheckitem(idChecklist, id).then(() => {
      console.log("Checkitems deleted successfully...");
    });
    deleteCurrentCheckitem(id);
    updateTotalCheckitems(idCard,"delete")
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
