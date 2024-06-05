import Nav from "./components/Header/Nav";
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
