import { connect } from 'react-redux'
import { accountCardShowSignIn, accountCardShowSignUp } from '../actions'
import $ from 'jquery'

const AccountCard = require('../components/account_card.jsx')

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
      $.post("/users/sign_in", {user: data})
        .done((res) => {
          console.log("sign in succeeded with response:")
          console.log(res)
        })
        .fail((res) => {
          console.log("sign in failed with response:")
          console.log(res)
        })
    },
    signUpClicked: (data) => {
      $.post("/users", {user: data})
        .done((res) => {
          console.log("sign up succeeded with response:")
          console.log(res)
        })
        .fail((res) => {
          console.log("sign up failed with response:")
          console.log(res)
        })
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AccountCard)
