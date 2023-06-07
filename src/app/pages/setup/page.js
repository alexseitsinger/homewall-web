import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function SetupPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Welcome</title>
        <link rel="canonical" href="https://www.homewall.com/setup/" />
        <meta name="description" content="setup-page-description" />
      </Helmet>
      <Container>
        <Row>
          Name of external interface
        </Row>
        <Row>
          Name of internal interface
        </Row>
      </Container>
    </React.Fragment>
  )
}
