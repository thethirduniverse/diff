import { userSignIn, userSignOut, topicFeedReload, categoryLoad } from 'actions'

export default function(store) {
  const data = JSON.parse(document.getElementById('bootstrap').innerHTML)

  // User info
  if (data.user_status.signedIn) {
    store.dispatch(userSignIn(data.user_status.user))
  }

  // Inital feed content
  store.dispatch(topicFeedReload(data.topic_feed.topics))

  // Load topic categories
  store.dispatch(categoryLoad(data.categories))
}
