import setups from './setups'
setups()

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import appReducer from './reducers'
const store = createStore(appReducer)

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
