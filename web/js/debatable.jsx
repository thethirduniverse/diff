var setups = require('./setups')
setups()

var React = require('react')
var ReactDOM = require('react-dom')
require('jquery')

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

var appReducer = require('./reducers')

const store = createStore(appReducer)

var AccountCardController = require('./controllers/account_card_controller.js')

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AccountCardController />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root')
)
