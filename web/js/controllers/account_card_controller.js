import { connect } from 'react-redux'
import { userShowSignInForm, userShowSignUpForm, userSignIn, userSignUp, userShowSignInError, userShowSignUpError } from '../actions'
import $ from 'jquery'
import AccountCard from '../components/account_card.jsx'
import { updatePageAndAjaxCSRFToken } from '../helpers/csrf_token_helpers.js'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.accountReducer.visible_form,
    errors: state.accountReducer.errors,
    _userSignedIn: state.accountReducer.signed_in,
  }
}

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
          dispatch(userSignIn(res.user))
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
          dispatch(userSignUp(res))
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
    _navigate: (url) => {
      dispatch(push(url))
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
        d._navigate('/')
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountCard)
