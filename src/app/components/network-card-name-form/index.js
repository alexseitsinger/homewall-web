import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function NetworkCardNameForm(props) {
  const [ value, setValue ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onSubmit(value)
    setValue('')
  }

  const handleChange = (e) => {
    // *TODO* debounce
    setValue(e.target.value)
  }

  const handleCancel = (e) => {
    props.onCancel();
  }
  
  const placeholder = typeof props.currentName !== 'undefined' 
    ? props.currentName 
    : "Name"

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
        <div className="p-2 flex-grow-1">
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="p-2">
          <Button type="submit" variant="primary">
            Save 
          </Button>
          <Button onClick={handleCancel} className="ms-2">
            Cancel
          </Button>
        </div>
    </Form>
  )
}

