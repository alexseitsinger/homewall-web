import React from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

//import FileContents from "src/app/components/file-contents"
import EditableFileContents from "src/app/components/editable-file-contents"

export default function FirewallRulesPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Firewall Rules</title>
        <link rel="canonical" href="https://www.homewall.com/firewall/rules" />
        <meta name="description" content="firewall-rules-description" />
      </Helmet>
      <Container>
        <EditableFileContents 
          name="pf.conf" 
          path="/etc/pf.conf" 
        />
      </Container>
    </React.Fragment>
  )
}
