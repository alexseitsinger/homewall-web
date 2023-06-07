import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { createRouterMiddleware } from "@lagunovsky/redux-react-router"
import { logger as reduxLogger } from "redux-logger"

import createRootReducer from "./reducer"

export default (currentHistory, initialState = {}) => {
  const rootReducer = createRootReducer(currentHistory)

  const middleware = [
    createRouterMiddleware(currentHistory),
    thunk,
  ]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(reduxLogger)
  }

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // ...
    })
    : compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers, if any.
  )

  const store = createStore(rootReducer, initialState, enhancer)

  if (process.env.NODE_ENV !== 'production') {
    if (typeof module !== 'undefined' && module.hasOwnProperty('hot')) {
      module.hot.accept('./reducer', async () => {
        const nextCreateRootReducer = (await import('./reducer')).default
        const nextRootReducer = nextCreateRootReducer(currentHistory)
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  //if (process.env.NODE_ENV !== 'production') {
    //global.store = store
  //}

  return store
}
