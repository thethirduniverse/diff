import $ from 'jquery'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import Profile from 'components/profile.jsx'
import { profileLoadUser, profileShowInfoForm, profileHideInfoForm, profileUpdateInfoFormErrors } from 'actions'

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
    _onSubmitInfoClicked: (data, user) => {
      $.ajax({
        url: '/api/users/' + ownProps.params.id,
        data: getInfoUpdateData(user, data.user),
        type: 'PUT',
        processData: false,
        contentType: false
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
  first_name: data.first_name,
  last_name: data.last_name,
  bio: data.bio
})

const getInfoUpdateData = (orig, data) => {
  /* eslint-disable no-undef */
  var f = new FormData()
  /* eslint-enable no-undef */
  if (data.first_name !== orig.first_name) {
    f.append('user[first_name]', data.first_name)
  }
  if (data.last_name !== orig.last_name) {
    f.append('user[last_name]', data.last_name)
  }
  if (data.bio !== orig.bio) {
    f.append('user[bio]', data.bio)
  }
  if (data.avatar) {
    f.append('user[avatar]', data.avatar)
  }
  return f
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(Profile)
