import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AccountCard from 'components/account_card.jsx'
import { updatePageAndAjaxCSRFToken } from 'helpers/csrf_token_helpers.js'
import { userShowSignInForm, userShowSignUpForm, userSignIn, userSignUp, userShowSignInError, userShowSignUpError } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.accountReducer.visible_content,
    errors: state.accountReducer.errors,
    signUpEmail: state.accountReducer.sign_up_email,
    _userSignedIn: state.accountReducer.signed_in,
  }
}

const getUserFromSignInResponse = (res) => ( res.user )
const getUserFromSignUpResponse = (res) => ( res )

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    notHaveAccountClicked: () => {
      dispatch(userShowSignUpForm())
    },
    haveAccountClicked: () => {
      dispatch(userShowSignInForm())
    },
    signInClicked: (data) => {
      $.post("/api/users/sign_in", {user: data})
        .done((res) => {
          dispatch(userSignIn(getUserFromSignInResponse(res)))
          updatePageAndAjaxCSRFToken(res.newCSRFToken)
          dispatch(push('/'))
        })
        .fail((res) => {
          if (res.status === 401) {
            dispatch(userShowSignInError({form: res.responseText}))
          } else {
            dispatch(userShowSignInError({form: 'operation failed for unknown reason'}))
          }
        })
    },
    signUpClicked: (data) => {
      $.post("/api/users", {user: data})
        .done((res) => {
          console.log(res)
          dispatch(userSignUp(getUserFromSignUpResponse(res)))
        })
        .fail((res) => {
          console.log(res)
          if (res.status === 422) {
            dispatch(userShowSignUpError(res.responseJSON['errors']))
          } else {
            dispatch(userShowSignUpError({form: 'operation failed for unknown reason'}))
          }
        })
    },
    navigateToRoot: () => {
      dispatch(push('/'))
    }
  }
}

const mergeProps = (s, d, o) => {
  return {
    ...s,
    ...d,
    ...o,
    onComponentWillMount: () => {
      if (s._userSignedIn) {
        d.navigateToRoot()
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountCard)
