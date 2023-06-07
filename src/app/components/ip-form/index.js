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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="New IP address" 
          value={value}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  )
}

