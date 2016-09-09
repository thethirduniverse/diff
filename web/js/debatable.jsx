import setups from './setups'
setups()

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import appReducer from './reducers'
const store = createStore(appReducer)

import AccountCardController from './controllers/account_card_controller.js'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AccountCardController />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
