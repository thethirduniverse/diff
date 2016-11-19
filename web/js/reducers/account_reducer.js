import actions from 'actions'

const defaultState = {
  signed_in: false,
  sign_in_errors: null,
  sign_up_errors: null,
  user: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.userSignIn:
      return {
        ...state,
        signed_in: true,
        user:action.user,
        sign_in_errors: null,
        sign_up_errors: null
      }
    case actions.userShowSignInError:
      return {
        ...state,
        sign_in_errors: action.error
      }
    case actions.userShowSignUpError:
      return {
        ...state,
        sign_up_errors: action.error
      }
    case actions.userSignOut:
      return defaultState
    default:
      return state
  }
}
