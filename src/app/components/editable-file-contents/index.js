import React, { useState, useEffect, useCallback } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"

import FileContents from "app/components/file-contents"

export default function EditableFileContents(props) {
  const [isFetched, setFetched] = useState(false)
  const [lines, setLines] = useState([])

  // Save the file to props.path.
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const resp = await axios.post('/write', {
      path: props.path,
      lines,
    });
  }, [lines, props.path])

  const handleChange = useCallback((e) => {
    setLines(e.target.value.split('\n'))
  }, [])

  useEffect(() => {
    if (isFetched === true) {
      return
    }
    axios
      .post('/read', { path: props.path })
      .then((res) => {
        setLines(res.data.lines)
        setFetched(true)
      })
    return () => {
      // destroy func 
    }
  }, [axios, props.path])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>{props.path}</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={lines.length} 
          onChange={handleChange}
          value={lines.join('\r\n')}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
