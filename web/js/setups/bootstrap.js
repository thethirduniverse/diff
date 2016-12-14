import { userSignIn, postFeedReload, categoryLoad } from 'actions'

export default function(store) {
  const data = JSON.parse(document.getElementById('bootstrap').innerHTML)

  // User info
  if (data.user_status.signedIn) {
    store.dispatch(userSignIn(data.user_status.user))
  }

  // Inital feed content
  store.dispatch(postFeedReload(data.post_feed.posts, data.post_feed.has_more, data.post_feed.next_offset))

  // Load post categories
  store.dispatch(categoryLoad(data.categories))
}
