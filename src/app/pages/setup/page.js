import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import axios from "axios"

import NetworkCardNameForm from "app/components/network-card-name-form"

async function setCardRename(originalName, name) {
  await axios.post('/run', {command: `/usr/sbin/sysrc ifconfig_${originalName}_name="${name}"`})
}

export default function SetupPage(props) {
  const extCard = props.cards.filter(c => c.name === 'ext0')[0]
  const intCard = props.cards.filter(c => c.name === 'int0')[0]

  return (
    <React.Fragment>
      <Helmet>
        <title>Setup</title>
        <link rel="canonical" href="https://www.homewall.com/setup/" />
        <meta name="description" content="setup-page-description" />
      </Helmet>
      <Container>
        <p>Enter the original names of the following network cards. During boot, each card will be renamed to ext0 and int0 respectively.</p>
        <Stack direction="horizontal" gap={2}>
          <Card>
            <Card.Body>
              <Card.Title>ext0: WAN-facing</Card.Title>
              <Card.Text>
                <NetworkCardNameForm
                  onSubmit={(originalName) => {
                    if (originalName !== "") {
                      props.setOriginalCardName("ext0", originalName);
                      setCardRename(originalName, "ext0");
                    }
                  }}
                />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>int0: LAN-facing</Card.Title>
              <Card.Text>
                <NetworkCardNameForm
                  onSubmit={(originalName) => {
                    if (originalName !== "") {
                      props.setOriginalCardName("int0", originalName);
                      setCardRename(originalName, "int0");
                    }
                  }}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
