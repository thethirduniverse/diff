import actions from '../actions'

const defaultState = {
  signed_in: false,
  errors: null,
  user: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.userSignIn:
      return {
        ...state,
        signed_in: true,
        user:action.user,
        errors: null
      }
    case actions.userSignUp:
      return state
    case actions.userSignOut:
      return defaultState
    case actions.userShowSignInError:
    case actions.userShowSignUpError:
      return {
        ...state,
        errors: action.error
      }
    default:
      return state
  }
}
