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
          <Nav.Link><span style={{ color: "white" }}>Setup</span></Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/cards">
          <Nav.Link><span style={{ color: "white" }}>Cards</span></Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/rules">
          <Nav.Link><span style={{ color: "white" }}>Rules</span></Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  )
  const navAnonymous = <div>anonymous</div>

  return (
    <React.Fragment>
      <div style={{ height: "58px" }}></div>
      <Navbar bg="dark" expand="lg" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><span style={{ color: "white" }}>HomeWall</span></Navbar.Brand>
          </LinkContainer>
          <div className="vr" style={{ minHeight: "100%", color: "white", marginLeft: "0.5em", marginRight: "0.5em" }}></div>
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
