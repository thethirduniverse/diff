import actions from '../actions'

const defaultState = {
  signed_in: false,
  visible_form: 'sign-in',
  errors: null,
  user: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.userShowSignInForm:
      return {
        ...state,
        visible_form: 'sign-in',
        errors: null
      }
    case actions.userShowSignUpForm:
      return {
        ...state,
        visible_form: 'sign-up',
        errors: null
      }
    case actions.userSignIn:
      return {
        ...state,
        signed_in: true,
        user:action.user,
        errors: null
      }
    case actions.userSignUp:
      return {
        ...state,
        errors: null
      }
    case actions.userShowSignInError:
    case actions.userShowSignUpError:
      return {
        ...state,
        errors: action.error
      }
    case actions.userSignOut:
      return defaultState
    default:
      return state
  }
}
