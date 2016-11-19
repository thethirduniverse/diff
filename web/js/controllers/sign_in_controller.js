import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SignInCard from 'components/sign_in.jsx'
import { updatePageAndAjaxCSRFToken } from 'helpers/csrf_token_helpers.js'
import { userSignIn, userShowSignInError } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.accountReducer.errors
  }
}

const getUserFromSignInResponse = (res) => ( res.user )

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    notHaveAccountClicked: () => {
      dispatch(push('/account/sign-up'))
    },
    signInClicked: (data) => {
      $.post("/api/users/sign_in", {user: data})
        .done((res) => {
          dispatch(userSignIn(getUserFromSignInResponse(res)))
          updatePageAndAjaxCSRFToken(res.newCSRFToken)

          const ref = ownProps.location.query.ref
          dispatch(push(ref ? ref : '/'))
        })
        .fail((res) => {
          if (res.status === 401) {
            dispatch(userShowSignInError({form: res.responseText}))
          } else {
            dispatch(userShowSignInError({form: 'operation failed for unknown reason'}))
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInCard)
