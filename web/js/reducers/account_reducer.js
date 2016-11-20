import actions from 'actions'

const defaultState = {
  signed_in: false,
  sign_in_errors: null,
  sign_up_errors: null,
  user: {},
  resetPassword: {
    emailErrors: {},
    passwordErrors: {},
    showBadTokenDialog: false
  }
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.accountResetPasswordUpdateErrors:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          emailErrors: action.errors
        }
      }
    case actions.accountResetPasswordUpdatePasswordErrors:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          passwordErrors: action.errors
        }
      }
    case actions.accountResetPasswordShowBadTokenDialog:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          showBadTokenDialog: true
        }
      }
    case actions.accountResetPasswordHideBadTokenDialog:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          showBadTokenDialog: false
        }
      }
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
