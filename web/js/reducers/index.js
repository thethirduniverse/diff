import { combineReducers } from 'redux'
import accountCardReducer from './account_card_reducer.js'

const appReducer = combineReducers({
  accountCardReducer
})

module.exports = appReducer
