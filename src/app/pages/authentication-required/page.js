import React from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

export default function AuthenticationRequiredPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Authentication Required</title>
        <link rel="canonical" href="https://www.homewall.com/authentication-required/" />
        <meta name="description" content="page-description" />
      </Helmet>
      <Container>
        Authentication is required to view this page.
      </Container>
    </React.Fragment>
  )
}
