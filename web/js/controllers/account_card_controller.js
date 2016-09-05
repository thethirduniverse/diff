import { connect } from 'react-redux'
import { accountCardShowSignIn, accountCardShowSignUp } from '../actions'

const AccountCard = require('../components/account_card.jsx')

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.accountCardReducer.visible
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    notHaveAccountClicked: () => {
      dispatch(accountCardShowSignUp())
    },
    haveAccountClicked: () => {
      dispatch(accountCardShowSignIn())
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AccountCard)
