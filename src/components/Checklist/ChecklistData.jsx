import { Text,Flex, Spacer,Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckitemsInChecklist from "../Checkitems/CheckitemsInChecklist";
import { deleteChecklist } from "../../Api";


function ChecklistData({ name, id, idCard, deleteCurrentChecklist }) {
  function handleDelete() {
    
    deleteChecklist(idCard,id)
      .then((data) => {
        console.log(`${id} deleted successfully`);
        deleteCurrentChecklist(data);
      })
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
      <CheckitemsInChecklist id={id} idCard={idCard}/>
    </Box>
  );
}

export default ChecklistData;