import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Resumify</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home"></Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;