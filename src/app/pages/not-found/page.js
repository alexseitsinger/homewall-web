import React from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

export default function NotFoundPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Resource Not Found</title>
        <link rel="canonical" href="https://www.homewall.com/not-found/" />
        <meta name="description" content="not-found-page-description" />
      </Helmet>
      <Container>
        <div>404 Not Found</div>
      </Container>
    </React.Fragment>
  )
}
