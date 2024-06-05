import { Text, Flex, Spacer, Box, Button, Progress } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import AddCheckitems from "../Checkitems/AddCheckItems";
import CheckitemsData from "../Checkitems/CheckitemsData";

function ChecklistData({
  name,
  id,
  idCard,
  checkItems,
  deleteCurrentChecklist,
  additemToChecklist,
  handleCheckitemChange,
  currentCheckitemDelete,
}) {


  //deletion of checklist
  function handleDelete() {
    deleteCurrentChecklist(id);
  }

  let completedItems = checkItems?.filter(
    (checkitemData) => checkitemData.state === "complete"
  ).length;
  let percent = (completedItems / checkItems.length) * 100;

  function CheckitemsInChecklist() {
    return (
      <>
        <Flex alignItems="center" gap="1rem">
          <Text>{percent ? Math.floor(percent) : 0}%</Text>
          <Progress
            borderRadius="md"
            w="full"
            colorScheme="green"
            size="md"
            value={percent ? Math.floor(percent) : 0}
          />
        </Flex>
        {checkItems?.map((checkitem) => {
          return (
            <CheckitemsData
              key={checkitem.id}
              {...checkitem}
              idCard={idCard}
              currentCheckitemDelete={currentCheckitemDelete}
              handleCheckitemChange={handleCheckitemChange}
            />
          );
        })}
        <AddCheckitems id={id} additemToChecklist={additemToChecklist} />
      </>
    );
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
      <CheckitemsInChecklist />
    </Box>
  );
}

export default ChecklistData;
