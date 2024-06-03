import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import ListContainer from "./ListContainer";
import { getAllLists } from "../../Api";
import CreateList from "./CreateList";

function BoardsDetails() {
  const { id } = useParams();
  const [listData, setListData] = useState([]);
  const [isError, setIsError] = useState(false);

  const addNewList = (newList) => {
    setListData([...listData, ...newList]);
  };

  const deleteCurrentListData = (listId) => {
    const remainingLists = listData.filter((data) => {
      if (data.id != listId) {
        return true;
      }
    });
    setListData(remainingLists);
  };

  useEffect(() => {
    getAllLists(id)
      .then((data) => {
        console.log("inside then");
        setListData(data);
      })
      .catch((err) => {
        console.log("inside the catch");
        setIsError(true);
      });
  }, []);

  return (
    <>
      {!isError ? (
        <Flex>
          <Box minW={"15vw"}></Box>
          <Flex
            overflowX="auto"
            gap="1rem"
            h="92vh"
            minW={"85vw"}
            className="list-container"
            px="1rem"
            pt="1rem"
          >
            {listData?.map((list) => {
              // console.log(list);
              return (
                <ListContainer
                  key={list.id}
                  {...list}
                  deleteCurrentListData={deleteCurrentListData}
                />
              );
            })}
            <CreateList id={id} addNewList={addNewList} />
          </Flex>
        </Flex>
      ) : (
        <h2>Board not found</h2>
      )}
    </>
  );
}

export default BoardsDetails;
