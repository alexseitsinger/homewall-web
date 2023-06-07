import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import { createMemoryHistory } from "history"
import { Provider } from "react-redux"
import { Helmet, HelmetProvider } from "react-helmet-async"
import SSRProvider from "react-bootstrap/SSRProvider"

import App from "./app"
import configureStore from "./app/store"

export default function renderForServer(url) {
  // Create a new history object.
  const serverHistory = createMemoryHistory({ initialEntries: [url] })

  // Grab the initial state.
  const initialState = {}
  //const stateKey = '__INITIAL_STATE__';
  //if (typeof req.body[stateKey] !== 'undefined') {
    //initialState = req.body[stateKey];
  //}

  // Create the store.
  const store = configureStore(serverHistory, initialState)

  // Prepare context for helmet.
  const helmetContext = {}

  // Compose the app using the things above and StaticRouter.
  const composedApp = (
    <SSRProvider>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </SSRProvider>
  )

  // Grab the values for the returned items.
  const html = renderToString(composedApp)
  const state = store.getState()
  const { helmet } = helmetContext

  // Return the items
  return {
    html,
    state,
    helmet,
  }
}
