import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "app/components/layout"
import RequireState from "app/components/require-state"

import AuthenticationRequiredPage from "app/pages/authentication-required"
import NotFoundPage from "app/pages/not-found"
import WelcomePage from "app/pages/welcome"
import HomePage from "app/pages/home"
import NetworkCardsPage from "app/pages/network-cards"
import SetupPage from "app/pages/setup"
//import FirewallRulesPage from "app/pages/firewall-rules"
//import FirewallStatusPage from "app/pages/firewall-status"

//<Route path="firewall"> <Route path="rules" element={( <RequireState name="isAuthenticated" value={true} redirectTo="/authentication-required"> <FirewallRulesPage /> </RequireState>)} />
//<Route path="status" element={( <RequireState name="isAuthenticated" value={true} redirectTo="/authentication-required"> <FirewallStatusPage /> </RequireState>)} /> 
//</Route>

export default function AppRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={(<RequireState name="isAuthenticated" value={true} redirectTo="/welcome"><HomePage /></RequireState>)} />
        <Route path="welcome" element={(<RequireState name="isAuthenticated" value={false} redirectTo="/"><WelcomePage /></RequireState>)} />
        <Route path="setup" element={(<RequireState name="isAuthenticated" value={true} redirectTo="/"><SetupPage /></RequireState>)} />
        <Route path="network-cards" element={(<RequireState name="isAuthenticated" value={true} redirectTo="/authentication-required"><NetworkCardsPage /></RequireState>)} />
        <Route path="authentication-required" element={(<RequireState name="isAuthenticated" value={false} redirectTo={"/"}><AuthenticationRequiredPage /></RequireState>)} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
