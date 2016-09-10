export default (state = {'signed-in': false}, action) => {
  switch (action.type) {
    case 'USER_SIGN_IN':
      return Object.assign({}, state, {'signed-in': true})
    case 'USER_SIGN_UP':
      return state
    case 'USER_SIGN_OUT':
      return Object.assign({}, state, {'signed-in': false})
    default:
      return state
  }
}
