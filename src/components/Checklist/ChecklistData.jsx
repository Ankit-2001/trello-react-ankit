import { Text, Flex, Spacer, Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import CheckitemsInChecklist from "../Checkitems/CheckitemsInChecklist";
import { deleteChecklist } from "../../Api";
import { useContext } from "react";
import CheckItemsContext from "../CheckitemContext";

function ChecklistData({
  name,
  checkItems,
  id,
  idCard,
  deleteCurrentChecklist,
}) {
  const { updateCheckedCheckitems, updateTotalCheckitems } =
    useContext(CheckItemsContext);


  function handleDelete() {
    console.log(checkItems);
    let completedItems = checkItems.filter(
      (data) => data.state == "complete"
    ).length;
    updateCheckedCheckitems(idCard, "complete", completedItems);
    updateTotalCheckitems(idCard, "delete", checkItems.length);
    deleteChecklist(idCard, id).then((data) => {
      console.log(`${id} deleted successfully`);
      deleteCurrentChecklist(data);
    });
  }

  return (
    <Box mb="2rem">
      <Flex mr="2rem" alignItems="center">
        <Text>{name}</Text>
        <Spacer />
        <Button bg="none" _hover={{ bg: "none" }} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Flex>
      <CheckitemsInChecklist id={id} idCard={idCard} />
    </Box>
  );
}

export default ChecklistData;
