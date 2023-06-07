import React, { useState, useEffect } from "react"
import axios from "axios"

export default function FileContents(props) {
  const [lines, setLines] = useState([])
  const [isFetched, setFetched] = useState(false)

  useEffect(() => {
    if (isFetched === true) {
      return
    }
    axios.get(`/read/${props.name}`).then(res => {
      setLines(res.data.lines)
      setFetched(true)
    })
  })

  const mapped = lines.map(l => {
    return <li>{l}</li>
  })

  return (
    <React.Fragment>
      <h6>{props.path}</h6>
      <code><ul className="list-unstyled">{mapped}</ul></code>
    </React.Fragment>
  )
}
