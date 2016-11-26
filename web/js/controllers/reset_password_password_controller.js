import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ResetPasswordPasswordCard from 'components/reset_password_password_form.jsx'
import { accountResetPasswordUpdatePasswordErrors, accountResetPasswordShowBadTokenDialog, accountResetPasswordHideBadTokenDialog, userSignIn } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.accountReducer.resetPassword.passwordErrors,

    // bad token dialog
    showBadTokenDialog: state.accountReducer.resetPassword.showBadTokenDialog
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitClicked: (data) => {
      const token = ownProps.location.query.reset_password_token

      $.ajax({
        url: '/api/users/password',
        type: 'PUT',
        data: {
          ...data,
          user: {
            ...data.user,
            reset_password_token: token
          }
        }
      })
        .done((res) => {
          dispatch(push('/'))
          $.post('/api/users/fetch')
            .done((res) => {
              dispatch(userSignIn(res.user))
            })
            .fail((res) => {
              console.log('fail to load session info after resetting password')
              console.log(res)
            })
        })
        .fail((res) => {
          if (res.status === 422) {
            const errors = res.responseJSON.errors
            if (errors.reset_password_token !== undefined) {
              dispatch(accountResetPasswordShowBadTokenDialog())
            }
            dispatch(accountResetPasswordUpdatePasswordErrors(errors))
          } else {
            console.log('request reset password failed with response:')
            console.log(res)
          }
        })
    },
    dismissDialog: () => {
      dispatch(accountResetPasswordHideBadTokenDialog())
    },
    resetPassword: () => {
      dispatch(push('/account/reset-password/email'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPasswordCard)
