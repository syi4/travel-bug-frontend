import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../state/constants/authConstants";
import { LinkContainer } from "react-router-bootstrap";
import decode from "jwt-decode";

export const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar bg="primary" variant="dark" sticky="top">
      <Container style={{ maxWidth: "900px" }}>
        <LinkContainer to="/">
          <Nav.Link>
            <Navbar.Brand>Travel Bug</Navbar.Brand>
          </Nav.Link>
        </LinkContainer>

        {user?.result ? (
          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/create-post">
              <Button variant="secondary">Upload</Button>
            </LinkContainer>
            <NavDropdown title={user.result.user} id="navbarScrollingDropdown">
              <LinkContainer to={`/user/${user?.result.user}`}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/login">
              <Button variant="secondary">Log in</Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>Sign up</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
