import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { getAllBoards } from "../../Api";
import { Link } from "react-router-dom";

function BoardContainer({ boards, addNewBoards }) {
  //   console.log(apiKey);
  //   console.log(token);

  useEffect(() => {
    getAllBoards()
      .then((response) => {
        addNewBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
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

  const allBoards = boards.map((board) => {
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
  });

  return <>{allBoards}</>;
}

export default BoardContainer;
