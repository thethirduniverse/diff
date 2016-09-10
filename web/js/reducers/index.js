import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import accountCardReducer from './account_card_reducer.js'
import accountReducer from './account_reducer.js'

export default combineReducers({
  accountCardReducer,
  accountReducer,
  form: formReducer
})
