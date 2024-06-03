import { Box, Button, Image} from "@chakra-ui/react";
import logo from "../../assets/Trello_logo.png"
import { Link } from "react-router-dom";



function Nav(){

    return (
      <Link to="/">
        <Box as="nav" bg="gray.400" p="2" h="8vh">
          <Button>
            <Image src={logo} h="2.5rem" />
          </Button>
        </Box>
      </Link>
    );
}

export default Nav;