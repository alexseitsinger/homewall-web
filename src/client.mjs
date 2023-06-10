import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { createBrowserHistory } from "history"
import { Provider } from "react-redux"
import { ReduxRouter } from "@lagunovsky/redux-react-router"
import { HelmetProvider } from "react-helmet-async"
import SSRProvider from "react-bootstrap/SSRProvider"

import App from "./app"
import configureStore from "./app/store"

// Comment here about only importing on client-side.
import "bootstrap/dist/css/bootstrap.min.css"

// Grab the initial state to hydrate with from the DOM.
// Delete the ereference to prevent memory leakage.
const initialState = window.__STATE__
delete window.__STATE__

// Create new browser history.
const history = createBrowserHistory()

// Create new store.
const store = configureStore(history, initialState)

// Generate the root element.
const root = createRoot(document.getElementById('root'))
//const root = hydrateRoot(document.getElementById('root'))

// Required if router isn't located at the top of rootReducer.
const routerSelector = state => state.common.router

const renderApp = () => {
  const composedApp = (
    <SSRProvider>
      <HelmetProvider>
        <Provider store={store}>
          <ReduxRouter history={history} routerSelector={routerSelector}>
            <App />
          </ReduxRouter>
        </Provider>
      </HelmetProvider>
    </SSRProvider>
  )

  root.render(composedApp)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function onLoaded() {
    renderApp()
    document.removeEventListener("DOMContentLoaded", onLoaded)
  })
} else {
  renderApp()
}

/*
if (process.env.NODE_ENV !== 'production') {
  if (typeof module !== 'undefined' && module.hot) {
    module.hot.accept('./app/index', () => {
      console.log('Hot-reloaded ./app/index');
    })
  }
}
*/
