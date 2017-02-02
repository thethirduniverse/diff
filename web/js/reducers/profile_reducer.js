import actions from 'actions'

const defaultState = {
  user: null,
  viewingSelf: false,
  show_info_form: false,
  info_form_errors: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.profileLoadUser:
      return {
        ...state,
        user: action.user,
        viewingSelf: action.viewingSelf
      }
    case actions.profileLoadMorePostedTopics:
      return {
        ...state,
        user: {
          ...state.user,
          posted_posts: {
            ...state.user.posted_posts,
            posts: [...state.user.posted_posts.posts, ...action.posts],
            has_more: action.has_more,
            next_offset: action.next_offset
          }
        }
      }
    case actions.profileShowInfoForm:
      return {
        ...state,
        show_info_form: true
      }
    case actions.profileHideInfoForm:
      return {
        ...state,
        show_info_form: false
      }
    case actions.profileUpdateInfoFormErrors:
      return {
        ...state,
        info_form_errors: action.errors
      }
    default:
      return state
  }
}
