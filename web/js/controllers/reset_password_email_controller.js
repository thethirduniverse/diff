import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResetPasswordEmailCard from 'components/reset_password_email_form.jsx'
import { accountResetPasswordUpdateErrors } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.accountReducer.resetPassword.emailErrors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetClicked: (data) => {
      $.post('/api/request-reset-password', data)
        .done((res) => {
          dispatch(push({
            pathname: '/account/reset-password/check-email',
            query: {
              email: data.email
            }
          }))
        })
        .fail((res) => {
          if (res.status === 400) {
            dispatch(accountResetPasswordUpdateErrors(res.responseJSON.errors))
          } else {
            console.log('request reset password failed with response:')
            console.log(res)
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordEmailCard)
