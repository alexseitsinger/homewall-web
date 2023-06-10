import React from "react"
import { Helmet } from "react-helmet-async"

import AppRoutes from "./routes" 

export default function App(props) {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | HomeWall Basic">
        <meta name="description" content="HomeWall" />
        <link rel="canonical" href="https://www.homewall.com/" />
        <link rel="shortcut icon" href="/static/16x16.png" />
      </Helmet>
      <AppRoutes />
    </React.Fragment>
  )
}
