import { useState } from "react";
import Nav from "./components/Header/Nav";
import Boards from "./components/Boards/Boards";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
