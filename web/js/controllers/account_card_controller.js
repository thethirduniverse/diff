import { connect } from 'react-redux'
import { accountCardShowSignIn, accountCardShowSignUp, userSignIn, userSignUp } from '../actions'
import $ from 'jquery'
import AccountCard from '../components/account_card.jsx'
import { updatePageAndAjaxCSRFToken } from '../helpers/csrf_token_helpers.js'

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.accountCardReducer.visible,
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
          console.log("sign in succeeded with response:")
          console.log(res)
          dispatch(userSignIn(res.user))
          updatePageAndAjaxCSRFToken(res.newCSRFToken)
        })
        .fail((res) => {
          console.log("sign in failed with response:")
          console.log(res)
        })
    },
    signUpClicked: (data) => {
      $.post("/api/users", {user: data})
        .done((res) => {
          console.log("sign up succeeded with response:")
          console.log(res)
          dispatch(userSignUp(res))
        })
        .fail((res) => {
          console.log("sign up failed with response:")
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCard)
