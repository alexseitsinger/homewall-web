import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"

import NetworkCard from "src/app/components/network-card"

export default function NetworkCardsPage(props) {
  const cards = props.cards.map(c => (
    <NetworkCard key={c.name} data={c} 
      setAddress={props.setAddress} 
      setName={props.setName}
      addGroup={props.addGroup}
      setStatus={props.setStatus}
    />
  ))

  return (
    <React.Fragment>
      <Helmet>
        <title>Network Cards</title>
        <link rel="canonical" href="https://www.homewall.com/network-cards/" />
        <meta name="description" content="homewall is firewall for your home network" />
      </Helmet>
      <Container>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Groups</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cards}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  )
}
