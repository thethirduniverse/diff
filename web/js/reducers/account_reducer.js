const defaultState = {signed_in: false, user: {}}
import actions from '../actions'

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.userSignIn:
      return Object.assign({}, state, {signed_in: true, user:action.user})
    case actions.userSignUp:
      return state
    case actions.userSignOut:
      return defaultState
    default:
      return state
  }
}
