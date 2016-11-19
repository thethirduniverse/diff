import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EmailConfirmationCard from 'components/email_confirmation_card.jsx'
import { userShowSignInForm, userSignUp, userShowSignUpError } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    email: ownProps.location.query.email
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateToRoot: () => {
      dispatch(push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationCard)
