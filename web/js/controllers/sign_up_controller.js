import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SignUpCard from 'components/sign_up.jsx'
import { userShowSignInForm, userSignUp, userShowSignUpError } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.accountReducer.errors,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const ref = ownProps.location.query.ref

  const navigateBack = () => {
    dispatch(push(ref ? ref : '/'))
  }

  return {
    haveAccountClicked: () => {
      dispatch(push('/account/sign-in'))
    },
    signUpClicked: (data) => {
      $.post("/api/users", {user: data})
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
          if (res.status === 422) {
            dispatch(userShowSignUpError(res.responseJSON['errors']))
          } else {
            dispatch(userShowSignUpError({form: 'operation failed for unknown reason'}))
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard)
