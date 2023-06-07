import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"

import Layout from "app/components/layout"
import SetupPage from "app/pages/setup"
import WelcomePage from "app/pages/welcome"
import HomePage from "app/pages/home"
import NetworkCardsPage from "app/pages/network-cards"
import FirewallRulesPage from "app/pages/firewall-rules"
import FirewallStatusPage from "app/pages/firewall-status"
import AuthenticationRequiredPage from "app/pages/authentication-required"
import NotFoundPage from "app/pages/not-found"
import RequireState from "app/components/require-state"

export default function App(props) {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | HomeWall Basic">
        <meta name="description" content="HomeWall" />
        <link rel="canonical" href="https://www.homewall.com/" />
        <link rel="shortcut icon" href="/static/16x16.png" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index 
            element={(
              <RequireState 
                name="isAuthenticated" 
                value={true} 
                redirectTo="/welcome">
                <HomePage />
              </RequireState>
            )}
          />
          <Route 
            path="setup" 
            element={(
              <RequireState 
                name="isAuthenticated" 
                value={true} 
                redirectTo="/">
                <SetupPage />
              </RequireState>
            )}
          />
          <Route 
            path="welcome" 
            element={(
              <RequireState 
                name="isAuthenticated" 
                value={false} 
                redirectTo="/">
                <WelcomePage />
              </RequireState>
            )}
          />
          <Route 
            path="network-cards"
            element={(
              <RequireState 
                name="isAuthenticated" 
                value={true} 
                redirectTo="/authentication-required">
                <NetworkCardsPage />
              </RequireState>
            )}
          />
          <Route path="firewall">
            <Route
              path="rules" 
              element={(
                <RequireState 
                  name="isAuthenticated" 
                  value={true} 
                  redirectTo="/authentication-required">
                  <FirewallRulesPage />
                </RequireState>
              )}
            />
            <Route
              path="status" 
              element={(
                <RequireState 
                  name="isAuthenticated" 
                  value={true} 
                  redirectTo="/authentication-required">
                  <FirewallStatusPage />
                </RequireState>
              )}
            />
          </Route>
          <Route 
            path="authentication-required" 
            element={(
              <RequireState
                name="isAuthenticated"
                value={false}
                redirectTo={"/"}>
                <AuthenticationRequiredPage />
              </RequireState>
            )}
          />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}
