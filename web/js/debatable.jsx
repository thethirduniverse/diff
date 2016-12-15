import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import theme from '~/theme.js'
import appReducer from 'reducers'
import createLogger from 'helpers/redux_logger_helpers.js'
import routes from '~/routes.jsx'
import setups from 'setups'

const logger = createLogger()
const store = createStore(
  appReducer,
  applyMiddleware(routerMiddleware(browserHistory), thunk, promise, logger)
)
const history = syncHistoryWithStore(browserHistory, store)

setups(store)

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
