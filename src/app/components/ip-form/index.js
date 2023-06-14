import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function IPForm(props) {
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
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <Form.Control
            type="text"
            placeholder="New IP address" 
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
      </div>
    </Form>
  )
}

