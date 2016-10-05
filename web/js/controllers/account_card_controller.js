import { connect } from 'react-redux'
import { accountCardShowSignIn, accountCardShowSignUp, userSignIn, userSignUp, userShowSignInError, userShowSignUpError } from '../actions'
import $ from 'jquery'
import AccountCard from '../components/account_card.jsx'
import { updatePageAndAjaxCSRFToken } from '../helpers/csrf_token_helpers.js'

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.accountCardReducer.visible,
    errors: state.accountReducer.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    notHaveAccountClicked: () => {
      dispatch(accountCardShowSignUp())
    },
    haveAccountClicked: () => {
      dispatch(accountCardShowSignIn())
    },
    signInClicked: (data) => {
      $.post("/api/users/sign_in", {user: data})
        .done((res) => {
          dispatch(userSignIn(res.user))
          updatePageAndAjaxCSRFToken(res.newCSRFToken)
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard)
