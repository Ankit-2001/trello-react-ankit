import { Text, Flex, Spacer, Box, Button,Progress } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";

import { deleteChecklist, getCheckitems } from "../../Api";
import CheckItemsContext from "../CheckitemContext";
import AddCheckitems from "../Checkitems/AddCheckItems"
import CheckitemsData from "../Checkitems/CheckitemsData"

function ChecklistData({
  name,
  id,
  idCard,
  deleteCurrentChecklist,
}) {
  const { updateCheckedCheckitems, updateTotalCheckitems } =
    useContext(CheckItemsContext);

  const [checkitems, setCheckitems] = useState([]);

   const handleCheckedChange = (checkitemId) => {
     const updatedCheckitems = checkitems.map((checkitemData) => {
       if (checkitemData.id === checkitemId) {
        const copyItem = {...checkitemData}
         if (copyItem.state === "complete") {
           updateCheckedCheckitems(idCard, checkitemData.state);
           copyItem.state = "incomplete";
         } else {
           updateCheckedCheckitems(idCard, checkitemData.state);
           copyItem.state = "complete";
         }
         return copyItem
       }
       return checkitemData;
     });
     setCheckitems(updatedCheckitems);
   };

   useEffect(() => {
     getCheckitems(id).then((data) => {
      //  console.log(data);
       setCheckitems(data);
     });
   }, []);

   const addNewCheckitems = (checkitem) => {
     setCheckitems([...checkitems, checkitem]);
     updateTotalCheckitems(idCard, "add");
   };

   const deleteCurrentCheckitem = (checkitemId) => {
     const remainingCheckitems = checkitems.filter((data) => {
       if (data.id != checkitemId) {
         return true;
       } else {
         if (data.state === "complete") {
           updateCheckedCheckitems(idCard, "complete");
         }
       }
     });
     setCheckitems(remainingCheckitems);
   };

  function handleDelete() {
    // console.log(checkitems);
    let completedItems = checkitems.filter(
      (data) => data.state == "complete"
    ).length;
    updateCheckedCheckitems(idCard, "complete", completedItems);
    updateTotalCheckitems(idCard, "delete", checkitems.length);
    deleteChecklist(idCard, id).then((data) => {
      console.log(`${id} deleted successfully`);
      deleteCurrentChecklist(data);
    });
  }

   let completedItems = checkitems.filter(
     (checkitemData) => checkitemData.state === "complete"
   ).length;
   let percent = (completedItems / checkitems.length) * 100;

   function CheckitemsInChecklist(){
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
          {checkitems.map((checkitem) => {
            return (
              <CheckitemsData
                key={checkitem.id}
                {...checkitem}
                idCard={idCard}
                deleteCurrentCheckitem={deleteCurrentCheckitem}
                handleCheckedChange={handleCheckedChange}
              />
            );
          })}
          <AddCheckitems id={id} addNewCheckitems={addNewCheckitems} />
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
