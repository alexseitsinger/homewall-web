import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

export default function WelcomePage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Welcome</title>
        <link rel="canonical" href="https://www.homewall.com/welcome/" />
        <meta name="description" content="welcome-page-description" />
      </Helmet>
      <Container>
        welcome-page-content
      </Container>
    </React.Fragment>
  )
}
