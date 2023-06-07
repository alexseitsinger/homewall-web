import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { CheckCircleFill, XCircleFill, PencilFill } from "react-bootstrap-icons"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import IPForm from "app/components/ip-form"
import NetworkCardNameForm from "app/components/network-card-name-form"

export default function NetworkCard({ data, setAddress, setName }) {
  const [isAddressBeingEdited, setAddressBeingEdited] = useState(false)

  const address = isAddressBeingEdited
    ? <React.Fragment>
      <IPForm
        onSubmit={(nextAddress) => {
          if (nextAddress !== "") {
            setAddress(data.name, nextAddress)
          }
          setAddressBeingEdited(false)
        }}
      />
      <Button variant="link" onClick={null}><CheckCircleFill /></Button>
      <Button variant="link" onClick={() => setAddressBeingEdited(false)}><XCircleFill /></Button>
      </React.Fragment>
    : <React.Fragment>
      <em>{data.address}</em>
      <Button variant="link" onClick={() => setAddressBeingEdited(true)}><PencilFill /></Button>
      </React.Fragment>

  const [isNameBeingEdited, setNameBeingEdited] = useState(false)
  const nameCol = isNameBeingEdited 
    ? <React.Fragment>
      <NetworkCardNameForm
        onSubmit={(nextName) => {
          if (nextName !== "") {
            setName(data.name, nextName)
          }
          setNameBeingEdited(false)
        }}
      />
      <Button variant="link" onClick={null}><CheckCircleFill /></Button>
      <Button variant="link" onClick={() => setNameBeingEdited(false)}><XCircleFill /></Button>
      </React.Fragment>
    : <React.Fragment>
      {data.name}
      <Button variant="link"><PencilFill onClick={() => setNameBeingEdited(true)} /></Button>
      </React.Fragment>

  return (
    <tr>
      <td className="align-middle">{nameCol}</td>
      <td className="align-middle">{address}</td>
      <td className="align-middle">{data.groups}</td>
      <td className="align-middle">{data.status}</td>
    </tr>
  )
}

