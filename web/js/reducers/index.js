import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import accountCardReducer from './account_card_reducer.js'
import accountReducer from './account_reducer.js'
import topicFeedReducer from './topic_feed_reducer.js'
import topicShowReducer from './topic_show_reducer.js'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  accountCardReducer,
  accountReducer,
  topics: topicFeedReducer,
  topicShow: topicShowReducer,
  form: formReducer,
  routing: routerReducer
})
