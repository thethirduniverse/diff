import actions from 'actions'

const defaultState = {
  link: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.shareLinkShow:
      return {
        ...state,
        link: action.link
      }
    case actions.shareLinkDismiss:
      return {
        ...state,
        link: null
      }
    default:
      return state
  }
}
