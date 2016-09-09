import setups from './setups'
setups()

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import appReducer from './reducers'
const store = createStore(appReducer)

import AppController from './controllers/app_controller.js'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AppController />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
