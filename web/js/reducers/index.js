import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import accountCardReducer from './account_card_reducer.js'

const appReducer = combineReducers({
  accountCardReducer,
  form: formReducer
})

module.exports = appReducer
