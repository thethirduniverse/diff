import { userSignIn, userSignOut } from '../actions'

export default function(store) {
  const data = JSON.parse(document.getElementById('bootstrap').innerHTML)

  if (data.user_status.signedIn) {
    store.dispatch(userSignIn(data.user_status.user))
  }
}
