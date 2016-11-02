import actions from 'actions'

const defaultState = {
  user: null,
  show_avatar_form: false,
  avatar_form_errors: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.profileLoadUser:
      return {
        ...state,
        user: action.user
      }
    case actions.profileShowAvatarForm:
      return {
        ...state,
        show_avatar_form: true
      }
    case actions.profileHideAvatarForm:
      return {
        ...state,
        show_avatar_form: false
      }
    case actions.profileUpdateAvatarFormErrors:
      return {
        ...state,
        avatar_form_errors: action.errors
      }
    default:
      return state
  }
}
