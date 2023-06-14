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
    ? <IPForm
        onSubmit={(nextAddress) => {
          if (nextAddress !== "") {
            setAddress(data.name, nextAddress)
          }
          setAddressBeingEdited(false)
        }}
        onCancel={() => {
          setAddressBeingEdited(false)
        }}
      />
    : <div className="d-flex align-items-center">
        <em>{data.address}</em>
        <Button 
          variant="link" 
          className="p-0 ms-2"
          onClick={() => setAddressBeingEdited(true)}>
          <PencilFill style={{ color: "gray" }} /> 
        </Button>
      </div>

  const [isNameBeingEdited, setNameBeingEdited] = useState(false)
  const nameCol = isNameBeingEdited 
    ? <NetworkCardNameForm
        currentName={data.name}
        onSubmit={(nextName) => {
          if (nextName !== "") {
            setName(data.name, nextName)
          }
          setNameBeingEdited(false)
        }}
        onCancel={() => {
          setNameBeingEdited(false)
        }}
      />
    : <div className="d-flex align-items-center">
        <span>{data.name}</span>
        <Button 
          variant="link"
          className="p-0 ms-2"
          onClick={() => setNameBeingEdited(true)}>
          <PencilFill style={{ color: "gray" }} />
        </Button>
      </div>

  return (
    <tr>
      <td className="p-2 align-middle">{nameCol}</td>
      <td className="p-2 align-middle">{address}</td>
      <td className="p-2 align-middle">{data.groups}</td>
      <td className="p-2 align-middle">{data.status}</td>
    </tr>
  )
}

