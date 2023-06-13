import React from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"

//import FileContents from "src/app/components/file-contents"
import EditableFileContents from "src/app/components/editable-file-contents"

export default function RulesPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Rules</title>
        <link rel="canonical" href="https://www.homewall.com/rules/" />
        <meta name="description" content="rules-page-description" />
      </Helmet>
      <Container>
        <EditableFileContents 
          name="pf.conf" 
          path="/etc/pf.conf" 
          onAfterSave={() => {
            //...
          }}
        />
      </Container>
    </React.Fragment>
  )
}
