import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import appReducer from 'reducers/app_reducer.js'
import accountReducer from 'reducers/account_reducer.js'
import categoryReducer from 'reducers/category_reducer.js'
import profileReducer from 'reducers/profile_reducer.js'
import postFeedReducer from 'reducers/post_feed_reducer.js'
import postFormReducer from 'reducers/post_form_reducer.js'
import postShowReducer from 'reducers/post_show_reducer.js'
import reportReducer from 'reducers/report_reducer.js'
import shareReducer from 'reducers/share_reducer.js'
import invitationReducer from 'reducers/invitation_reducer.js'
import editsReducer from 'reducers/edits_reducer.js'

export default combineReducers({
  app: appReducer,
  accountReducer,
  posts: postFeedReducer,
  postShow: postShowReducer,
  postForm: postFormReducer,
  profile: profileReducer,
  category: categoryReducer,
  form: formReducer,
  routing: routerReducer,
  report: reportReducer,
  share: shareReducer,
  invitation: invitationReducer,
  edits: editsReducer
})
