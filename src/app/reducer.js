import { combineReducers } from "redux"
import { createRouterReducer } from "@lagunovsky/redux-react-router"

import authenticationReducer from "src/app/authentication/reducer"
import homePageReducer from "src/app/pages/home/reducer"
import setupPageReducer from "src/app/pages/setup/reducer"
import welcomePageReducer from "src/app/pages/welcome/reducer"
import firewallRulesPageReducer from "src/app/pages/firewall-rules/reducer"
import firewallStatusPageReducer from "src/app/pages/firewall-status/reducer"
import networkCardsPageReducer from "src/app/pages/network-cards/reducer"
import authenticationRequiredPageReducer from "src/app/pages/authentication-required/reducer"
import notFoundPageReducer from "src/app/pages/not-found/reducer"

export default (history) => {
  const rootReducer = combineReducers({
    router: createRouterReducer(history),
    authentication: authenticationReducer,
    pages: combineReducers({
      home: homePageReducer,
      networkCards: networkCardsPageReducer,
      firewallRules: firewallRulesPageReducer,
      firewallStatus: firewallStatusPageReducer,
      welcome: welcomePageReducer,
      notFound: notFoundPageReducer,
      authenticationRequired: authenticationRequiredPageReducer,
    }),
  })

  return (state, action) => {
    // Reset the store when desired.
    if (action.type === 'store/RESET') {
      state = undefined
    }
    return rootReducer(state, action)
  }
}
