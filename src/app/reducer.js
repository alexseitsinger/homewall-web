import { combineReducers } from "redux"
import { createRouterReducer } from "@lagunovsky/redux-react-router"

import authenticationReducer from "src/app/common/authentication/reducer"
import cardsReducer from "src/app/common/cards/reducer"

import homePageReducer from "src/app/pages/home/reducer"
import setupPageReducer from "src/app/pages/setup/reducer"
import welcomePageReducer from "src/app/pages/welcome/reducer"
import rulesPageReducer from "src/app/pages/rules/reducer"
//import statusPageReducer from "src/app/pages/status/reducer"
import cardsPageReducer from "src/app/pages/cards/reducer"
import authenticationRequiredPageReducer from "src/app/pages/authentication-required/reducer"
import notFoundPageReducer from "src/app/pages/not-found/reducer"

export default (history) => {
  const rootReducer = combineReducers({
    common: combineReducers({
      router: createRouterReducer(history),
      authentication: authenticationReducer,
      cards: cardsReducer,
    }),
    pages: combineReducers({
      welcome: welcomePageReducer,
      home: homePageReducer,
      cards: cardsPageReducer,
      rules: rulesPageReducer,
      //status: statusPageReducer,
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
