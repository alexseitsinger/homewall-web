import React, { useEffect, useCallback, useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "react-bootstrap/Container"
import axios from "axios"

export default function FirewallStatusPage(props) {
  const [isFetched, setFetched] = useState(false)
  const [lines, setLines] = useState([])

  const fetchLines = useCallback(() => {
    axios
      .post('/run', { command: 'sudo /sbin/pfctl -s info' })
      .then((res) => {
        setLines(res.data.lines)
        setFetched(true)
      })
  }, [])

  useEffect(() => {
    if (isFetched === false) {
      fetchLines()
    }
    return () => {
      // ...
    }
  }, [])

  const mapped = lines.map((line, arr, i) => <div key={i}>{line}</div>)

  return (
    <React.Fragment>
      <Helmet>
        <title>Firewall Status</title>
        <link rel="canonical" href="https://www.homewall.com/firewall/status/" />
        <meta name="description" content="firewall-status-description" />
      </Helmet>
      <Container>
        {mapped}
      </Container>
    </React.Fragment>
  )
}
