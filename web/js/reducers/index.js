import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import accountReducer from 'reducers/account_reducer.js'
import categoryReducer from 'reducers/category_reducer.js'
import profileReducer from 'reducers/profile_reducer.js'
import topicFeedReducer from 'reducers/topic_feed_reducer.js'
import topicShowReducer from 'reducers/topic_show_reducer.js'

export default combineReducers({
  accountReducer,
  topics: topicFeedReducer,
  topicShow: topicShowReducer,
  profile: profileReducer,
  category: categoryReducer,
  form: formReducer,
  routing: routerReducer
})
