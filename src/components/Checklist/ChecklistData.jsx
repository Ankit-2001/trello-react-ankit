import { Text, Flex, Spacer, Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import CheckitemsInChecklist from "../Checkitems/CheckitemsInChecklist";
import { deleteChecklist, getCheckitems } from "../../Api";
import { useContext,useState,useEffect } from "react";
import CheckItemsContext from "../CheckitemContext";

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
         if (checkitemData.state === "complete") {
           updateCheckedCheckitems(idCard, checkitemData.state);
           checkitemData.state = "incomplete";
         } else {
           updateCheckedCheckitems(idCard, checkitemData.state);
           checkitemData.state = "complete";
         }
       }
       return checkitemData;
     });
     setCheckitems(updatedCheckitems);
   };

   useEffect(() => {
     getCheckitems(id).then((data) => {
       console.log(data);
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
    console.log(checkitems);
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

  return (
    <Box mb="2rem">
      <Flex mr="2rem" alignItems="center">
        <Text>{name}</Text>
        <Spacer />
        <Button bg="none" _hover={{ bg: "none" }} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Flex>
      <CheckitemsInChecklist
        id={id}
        idCard={idCard}
        handleCheckedChange={handleCheckedChange}
        addNewCheckitems={addNewCheckitems}
        deleteCurrentCheckitem={deleteCurrentCheckitem}
        checkitems={checkitems}
      />
    </Box>
  );
}

export default ChecklistData;
