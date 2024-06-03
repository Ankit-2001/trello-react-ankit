import { useState, useEffect, useContext } from "react";
import { Flex, Text, Progress } from "@chakra-ui/react";

import AddCheckitems from "./AddCheckItems";
import { getCheckitems } from "../../Api";
import CheckitemsData from "./CheckitemsData";
import CheckItemsContext from "../CheckitemContext";

function CheckitemsInChecklist({
  id,
  idCard,
  checkitems,
  deleteCurrentCheckitem,
  handleCheckedChange,
  addNewCheckitems,
}) {
  const { updateCheckedCheckitems, updateTotalCheckitems } =
    useContext(CheckItemsContext);

  let completedItems = checkitems.filter(
    (checkitemData) => checkitemData.state === "complete"
  ).length;

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
      <AddCheckitems id={id} addNewCheckitems={addNewCheckitems} />
    </>
  );
}

export default CheckitemsInChecklist;
