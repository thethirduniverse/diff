import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SignUpCard from 'components/sign_up.jsx'
import { userShowSignUpError } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.accountReducer.sign_up_errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    haveAccountClicked: () => {
      dispatch(push('/account/sign-in'))
    },
    forgotPasswordClicked: () => {
      dispatch(push('/account/reset-password/email'))
    },
    signUpClicked: (data) => {
      $.post('/api/users', data)
        .done((res) => {
          console.log(res)
          dispatch(push({
            pathname: '/account/email-confirmation',
            query: {
              email: res.email
            }
          }))
        })
        .fail((res) => {
          console.log(res)
          if (res.status === 422 || res.status === 400) {
            dispatch(userShowSignUpError(res.responseJSON['errors']))
          } else {
            dispatch(userShowSignUpError({form: 'operation failed for unknown reason'}))
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard)
