import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import NetworkCardNameForm from "app/components/network-card-name-form"

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
        <p>Enter the original names of the following network cards.</p>
        <Row>
          <Col xsm>
            WAN-facing network card
            <NetworkCardNameForm
              placeholder={extCard !== 'undefined' ? extCard.originalName : "external card name"}
              onSubmit={(originalName) => {
                if (originalName !== "") {
                  props.setOriginalCardName("ext0", originalName);
                }
              }}
            />
          </Col>
          <Col xsm>
            LAN-facing network card
            <NetworkCardNameForm
              placeholder={intCard !== 'undefined' ? intCard.originalName : "Internal card name"}
              onSubmit={(originalName) => {
                if (originalName !== "") {
                  props.setOriginalCardName("int0", originalName);
                }
              }}
            />
          </Col>
          <Col xsm>
            -
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
