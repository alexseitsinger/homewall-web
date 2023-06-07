import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

export default function HomePage(props) {
  const isAuthenticated = props.isAuthenticated

  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
        <link rel="canonical" href="https://www.homewall.com/" />
        <meta name="description" content="homewall is firewall for your home network" />
      </Helmet>
      <Container>
        { isAuthenticated ? <div>authenticated</div> : <div>anonymous</div> }
      </Container>
    </React.Fragment>
  )
}
