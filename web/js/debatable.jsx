import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import appReducer from './reducers'
import createLogger from './helpers/redux_logger_helpers.js'
const logger = createLogger()
const store = createStore(
  appReducer,
  applyMiddleware(routerMiddleware(browserHistory), thunk, promise, logger)
)
const history = syncHistoryWithStore(browserHistory, store)

import setups from './setups'
setups(store)

import routes from './routes.jsx'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
