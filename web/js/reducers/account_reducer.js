import actions from 'actions'

const defaultState = {
  signed_in: false,
  visible_content: 'sign-in',
  sign_up_email: null, //after sign up, temporary store user's email to display a tip.
  errors: null,
  user: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.userShowSignInForm:
      return {
        ...state,
        visible_content: 'sign-in',
        errors: null
      }
    case actions.userShowSignUpForm:
      return {
        ...state,
        visible_content: 'sign-up',
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
        visible_content: 'email-confirmation',
        sign_up_email: action.user.email,
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
