import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResetPasswordCard from 'components/reset_password_card.jsx'
import { accountResetPasswordEmailSent, accountResetPasswordUpdateErrors } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    email: state.accountReducer.resetPassword.email,
    errors: state.accountReducer.resetPassword.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateToRoot: () => {
      dispatch(push('/'))
    },
    resetClicked: (data) => {
      $.post('/api/request-reset-password', data)
        .done((res) => {
          dispatch(accountResetPasswordEmailSent(data.email))
        })
        .fail((res) => {
          if (res.status == 400) {
            dispatch(accountResetPasswordUpdateErrors(res.responseJSON.errors))
          } else {
            console.log('request reset password failed with response:')
            console.log(res)
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordCard)
