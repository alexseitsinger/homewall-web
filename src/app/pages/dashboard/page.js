import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

export default function DashboardPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboard</title>
        <link rel="canonical" href="https://www.homewall.com/dashboard/" />
        <meta name="description" content="dashboard-page-description" />
      </Helmet>
      <Container>
        dashboard-page-content
      </Container>
    </React.Fragment>
  )
}
