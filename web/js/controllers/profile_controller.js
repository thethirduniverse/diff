import $ from 'jquery'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import Profile from 'components/profile.jsx'
import { profileLoadUser, profileShowAvatarForm, profileHideAvatarForm, profileUpdateAvatarFormErrors, profileShowInfoForm, profileHideInfoForm, profileUpdateInfoFormErrors } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userID: ownProps.params.id,
    user: state.profile.user,
    showAvatarForm: state.profile.show_avatar_form,
    avatarFormErrors: state.profile.avatar_form_errors,
    showInfoForm: state.profile.show_info_form,
    infoFormErrors: state.profile.info_form_errors
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
    },
    _onSubmitInfoClicked: (data, user) => {
      $.ajax({
        url: '/api/users/' + ownProps.params.id,
        data: {user: getDirtyFields(user, data.user)},
        type: 'PUT'
      })
        .done((res) => {
          dispatch(profileHideInfoForm())
          dispatch(profileUpdateInfoFormErrors({}))
          reloadUser()
        })
        .fail((res) => {
          dispatch(profileUpdateInfoFormErrors(res.responseJSON.errors))
          console.log('update avatar failed with response:')
          console.log(res)
        })
    },
    _onEditInfoClicked: (user) => {
      dispatch(initialize('ProfileForm', {user: getInfoFormFields(user)}))
      dispatch(profileShowInfoForm())
    },
    onCancelEditInfoClicked: () => {
      dispatch(profileHideInfoForm())
      dispatch(profileUpdateInfoFormErrors({}))
    }
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const { user } = stateProps
  const { _onSubmitInfoClicked, _onEditInfoClicked } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmitInfoClicked: (data) => { _onSubmitInfoClicked(data, user) },
    onEditInfoClicked: () => { _onEditInfoClicked(user) }
  }
}

const getInfoFormFields = (data) => ({
  name: data.name,
  bio: data.bio
})

const getDirtyFields = (orig, data) => {
  const dirtyFields = {}
  if (data.name !== orig.name) {
    dirtyFields.name = data.name
  }
  if (data.bio !== orig.bio) {
    dirtyFields.bio = data.bio
  }
  return dirtyFields
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(Profile)
