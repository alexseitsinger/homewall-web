import React, { useState, useEffect, useCallback } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"

import FileContents from "app/components/file-contents"

async function writeRules(path, lines) {
  await axios.post('/write', {path, lines})
}

async function reloadRules() {
  await axios.post('/run', {command: '/sbin/pfctl -F all -f /etc/pf.conf'})
}

export default function EditableFileContents(props) {
  const [isFetched, setFetched] = useState(false)
  const [lines, setLines] = useState([])

  // Save the file to props.path.
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    writeRules(props.path, lines)
      .then(async () => {
        await reloadRules()
      })
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

  const handleCancel = useCallback((e) => {
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }, [props.onCancel])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        { props.isPathVisible ? <Form.Label>{props.path}</Form.Label> : null }
        <Form.Control 
          as="textarea" 
          rows={lines.length} 
          onChange={handleChange}
          value={lines.join('\r\n')}
        />
      </Form.Group>
      <div className="float-end">
        <Button variant="primary" type="submit"> 
          Save 
        </Button>
        <Button onClick={null} onClick={handleCancel} className="ms-2">
          Cancel
        </Button>
      </div>
    </Form>
  )
}
