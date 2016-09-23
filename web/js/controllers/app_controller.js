import { connect } from 'react-redux'
import $ from 'jquery'
import { push } from 'react-router-redux'
import App from '../components/app.jsx'
import { userSignIn, userSignOut } from '../actions'
import { updatePageAndAjaxCSRFToken } from '../helpers/csrf_token_helpers.js'

const mapStateToProps = (state, ownProps) => {
  return {
    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.post('/api/users/verify').
        done((res) => {
          console.log('verify successed with response:')
          console.log(res)
          if (res.signedIn) {
            dispatch(userSignIn(res.user))
          }
        }).
        fail((res) => {
          console.log('verify failed with response:')
          console.log(res)
        })
    },
    onSignOutClicked: () => {
      $.ajax({
        url: '/api/users/sign_out',
        method: 'DELETE',
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
      dispatch(push('/sign-in'))
    },
    onTitleClicked: () => {
      dispatch(push('/'))
    },
    _onProfileClicked: (id) => {
      dispatch(push('/profiles/' + id))
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
