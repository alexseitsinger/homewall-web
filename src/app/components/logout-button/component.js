import React from "react"
import Button from "react-bootstrap/Button"

export default function LogoutButton(props) {
  return (
    <Button type="primary" onClick={props.setAnonymous}>
      Logout
    </Button>
  )
}
