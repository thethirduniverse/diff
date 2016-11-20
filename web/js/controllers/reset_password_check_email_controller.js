import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResetPasswordCheckEmailCard from 'components/reset_password_check_email_card.jsx'

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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordCheckEmailCard)
