import { useState, useEffect, useContext } from "react";
import { Flex, Text, Progress } from "@chakra-ui/react";

import AddCheckitems from "./AddCheckItems";
import { getCheckitems } from "../../Api";
import CheckitemsData from "./CheckitemsData";
import CheckItemsContext from "../CheckitemContext";

function CheckitemsInChecklist({ id, idCard}) {
  const { updateCheckedCheckitems, updateTotalCheckitems } =
    useContext(CheckItemsContext);
  const [checkitems, setCheckitems] = useState([]);
  let completedItems = checkitems.filter(
    (checkitemData) => checkitemData.state === "complete"
  ).length;

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
    updateTotalCheckitems(idCard,"add");
    
  };



  const deleteCurrentCheckitem = (checkitemId) => {
    const remainingCheckitems = checkitems.filter((data) => {
      if (data.id != checkitemId) {
        
        return true;
      }
      else{
        if(data.state === 'complete'){
          updateCheckedCheckitems(idCard,'complete');
        }
      }
    });
    setCheckitems(remainingCheckitems);
  };

  const allCheckitems = checkitems.map((checkitem) => {
    return (
      <CheckitemsData
        key={checkitem.id}
        {...checkitem}
        idCard={idCard}
        deleteCurrentCheckitem={deleteCurrentCheckitem}
        handleCheckedChange={handleCheckedChange}
      />
    );
  });
  let percent = (completedItems / checkitems.length) * 100;
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
      {allCheckitems}
      <AddCheckitems id={id} addNewCheckitems={addNewCheckitems}  />
    </>
  );
}

export default CheckitemsInChecklist;
