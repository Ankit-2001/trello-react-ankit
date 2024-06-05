import { useEffect, useRef, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { getAllBoards } from "../../Api";
import CreateBoard from "./CreateBoard";

function BoardContainer() {
  const toast = useToast();
  const toastIdRef = useRef();
  const [boards, setBoards] = useState([]);
  const addNewBoards = (newBoard) => {
    setBoards([...boards, ...newBoard]);
  };

  useEffect(() => {
    getAllBoards()
      .then((response) => setBoards(response.data))
      .catch((err) => {
        console.log(err);
        toastIdRef.current = toast({
          duration: 1000,
          isClosable: true,
          position: "top-right",
          status: "error",
          description: `${err.message} :could not ${err.config.method} ${err.config.url}`,
        });
      });
  }, []);

  const buttonStyles = {
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    w: "12rem",
    h: "6rem",
    gap: "2rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    p: "2",
  };
  // console.log("boards", boards);
  return (
    <>
      {boards.length
        ? boards?.map((board) => {
            return (
              <Link to={`/boards/${board.id}`} key={board.id}>
                <Button
                  key={board.id}
                  backgroundColor={board.prefs?.backgroundColor}
                  backgroundImage={`url(${board.prefs?.backgroundImage})`}
                  backgroundSize="cover"
                  sx={buttonStyles}
                  _hover={{
                    backgroundColor: `${board.prefs?.backgroundColor}`,
                    backgroundImage: `url(${board.prefs?.backgroundImage}) `,
                    color: "white ",
                  }}
                >
                  <h3>{board.name}</h3>
                </Button>
              </Link>
            );
          })
        : null}
      <CreateBoard addNewBoards={addNewBoards} />
    </>
  );
}

export default BoardContainer;
