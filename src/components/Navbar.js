import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = () => {
  const { currentUser } = useUserContext();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="d-flex w-100 justify-content-between align-items-center nav-container">
        <div className="brand">
          <Navbar.Brand href="/">MyPhotoAlbum</Navbar.Brand>
        </div>
        <div className="menu">
          <div className="toggle-button">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser ? (
              <>
                <Nav className="me-auto">
                  <Nav.Link href="/">My Albums</Nav.Link>
                  <NavDropdown
                    title={currentUser.email}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item className="logout-button" href="/logout">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Sign up</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
