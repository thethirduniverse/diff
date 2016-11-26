import $ from 'jquery'
import { connect } from 'react-redux'

import Profile from 'components/profile.jsx'
import { profileLoadUser, profileShowAvatarForm, profileHideAvatarForm, profileUpdateAvatarFormErrors } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userID: ownProps.params.id,
    user: state.profile.user,
    showAvatarForm: state.profile.show_avatar_form,
    avatarFormErrors: state.profile.avatar_form_errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const reloadUser = () => {
    $.get('/api/profiles/' + ownProps.params.id)
      .done((res) => {
        dispatch(profileLoadUser(res.user))
      })
      .fail((res) => {
        console.log('load user with response:')
        console.log(res)
      })
  }
  return {
    onComponentWillMount: () => {
      reloadUser()
    },

    onSubmitAvatarClicked: (data) => {
      console.log(data)

      /* eslint-disable no-undef */
      var f = new FormData()
      /* eslint-enable no-undef */
      f.append('user[avatar]', data.user.avatar)

      $.ajax({
        url: '/api/update-avatar',
        data: f,
        processData: false,
        contentType: false,
        type: 'POST'
      })
        .done((res) => {
          dispatch(profileHideAvatarForm())
          dispatch(profileUpdateAvatarFormErrors({}))
          reloadUser()
        })
        .fail((res) => {
          dispatch(profileUpdateAvatarFormErrors(res.responseJSON.errors))
          console.log('update avatar failed with response:')
          console.log(res)
        })
    },
    onShowAvatarClicked: () => {
      dispatch(profileShowAvatarForm())
    },
    onCancelAvatarClicked: () => {
      dispatch(profileHideAvatarForm())
      dispatch(profileUpdateAvatarFormErrors({}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
