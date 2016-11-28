import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import appReducer from 'reducers/app_reducer.js'
import accountReducer from 'reducers/account_reducer.js'
import categoryReducer from 'reducers/category_reducer.js'
import profileReducer from 'reducers/profile_reducer.js'
import replyFormReducer from 'reducers/reply_form_reducer.js'
import topicFeedReducer from 'reducers/topic_feed_reducer.js'
import topicFormReducer from 'reducers/topic_form_reducer.js'
import topicShowReducer from 'reducers/topic_show_reducer.js'

export default combineReducers({
  app: appReducer,
  accountReducer,
  topics: topicFeedReducer,
  topicShow: topicShowReducer,
  topicForm: topicFormReducer,
  profile: profileReducer,
  category: categoryReducer,
  form: formReducer,
  routing: routerReducer,
  replyForm: replyFormReducer
})
