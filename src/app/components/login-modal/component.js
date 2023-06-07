import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import LoginForm from "app/components/login-form"
//import LogoutButton from "app/components/logout-button"

export default function LoginModal(props) {
  const isAuthenticated = props.isAuthenticated

  const [show, setShow] = useState(false)
  const handleHide = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <React.Fragment>
      <Button variant="primary" onClick={handleShow}>Login</Button>
      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm closeModal={handleShow} 
                     setAuthenticated={props.setAuthenticated} 
                     isAuthenticated={props.isAuthenticated} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
