import setups from './setups'
setups()

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import appReducer from './reducers'
import createLogger from './helpers/redux_logger_helpers.js'
const logger = createLogger()
const store = createStore(
  appReducer,
  applyMiddleware(thunk, promise, logger)
)

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
const history = syncHistoryWithStore(browserHistory, store)

import AppController from './controllers/app_controller.js'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppController} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
