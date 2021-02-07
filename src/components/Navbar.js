import React, { useState, useEffect } from "react";
import { DiGithubBadge } from "react-icons/di";
import { Navbar, Nav } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const NavbarComponent = () => {
  const [user, setUser] = useState(``);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(({ username }) => setUser(username))
      .catch((err) => {});
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Resumify</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="https://github.com/und3fined-v01d/resumify">
          <DiGithubBadge size="2em" />
        </Nav.Link>
      </Nav>
      {user && (
        <>
          <Navbar.Text>
            Signed in as: <a href="#login">{user}</a>
          </Navbar.Text>
          <div className="ml-2">
            <AmplifySignOut />
          </div>
        </>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
