import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { LinkContainer } from "react-router-bootstrap"

import LogoutButton from "app/components/logout-button"
import LoginModal from "app/components/login-modal"

export default function Layout(props) {
  const isAuthenticated = props.isAuthenticated

  const navAuthenticated = (
    <Nav>
      <Nav.Item>
        <LinkContainer to="/setup">
          <Nav.Link>Setup</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/network-cards">
          <Nav.Link>Network Cards</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <NavDropdown title="Firewall" id="nav-dropdown">
        <LinkContainer to="/firewall/status">
          <NavDropdown.Item>Status</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/firewall/rules">
          <NavDropdown.Item>Rules</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </Nav>
  )
  const navAnonymous = <div>anonymous</div>

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>HomeWall</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" justify-content="justify-content-end">
            <Nav className="me-auto">
              { isAuthenticated ? navAuthenticated : navAnonymous }
            </Nav>
            { isAuthenticated ? <LogoutButton /> : <LoginModal /> }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </React.Fragment>
  )
}
