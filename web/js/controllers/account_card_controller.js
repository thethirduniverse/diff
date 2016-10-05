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
          console.log(res)
          if (res.status === 401) {
            dispatch(userShowSignInError({form: res.responseText}))
          }
        })
    },
    signUpClicked: (data) => {
      $.post("/api/users", {user: data})
        .done((res) => {
          dispatch(userSignUp(res))
        })
        .fail((res) => {
          dispatch(userShowSignUpError(res.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard)
