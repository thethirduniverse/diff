var setups = require('./setups')
setups()

var React = require('react')
var ReactDOM = require('react-dom')
require('jquery')

import { createStore } from 'redux'
import { Provider } from 'react-redux'

var appReducer = require('./reducers')

const store = createStore(appReducer)

var AccountCardController = require('./controllers/account_card_controller.js')

ReactDOM.render(
  <Provider store={store}>
    <AccountCardController />
  </Provider>,
  document.getElementById('react-root')
)
