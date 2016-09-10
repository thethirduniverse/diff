const defaultState = {signed_in: false, user: {}}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_SIGN_IN':
      return Object.assign({}, state, {signed_in: true, user:action.user})
    case 'USER_SIGN_UP':
      return state
    case 'USER_SIGN_OUT':
      return defaultState
    default:
      return state
  }
}
