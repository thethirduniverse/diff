import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import App from 'components/app.jsx'
import { updatePageAndAjaxCSRFToken } from 'helpers/csrf_token_helpers.js'
import { userSignOut, appDismissError, postFormCreateRoot } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user,

    showError: state.app.error.visible,
    errorDescription: state.app.error.description
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignOutClicked: () => {
      $.ajax({
        url: '/api/users/sign_out',
        method: 'DELETE'
      })
        .done((res) => {
          console.log('log out succeed with response')
          console.log(res)
          dispatch(userSignOut())
          updatePageAndAjaxCSRFToken(res.newCSRFToken)
        })
        .fail((res) => {
          console.log('log out failed with response')
          console.log(res)
        })
    },
    onSignInClicked: () => {
      dispatch(push('/account/sign-in'))
    },
    onTitleClicked: () => {
      dispatch(push('/'))
    },
    onNewTopicClicked: () => {
      dispatch(postFormCreateRoot())
      dispatch(push('/posts'))
    },
    _onProfileClicked: (id) => {
      dispatch(push('/profiles/' + id))
    },
    onDismissErrorClicked: () => {
      dispatch(appDismissError())
    },
    onInviteClicked: () => {
      dispatch(push('/invitation'))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { user } = stateProps
  const { _onProfileClicked } = dispatchProps

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onProfileClicked: () => {
      _onProfileClicked(user.id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
