const accountCardReducer = (state = {'visible': 'sign-in'}, action) => {
  switch (action.type) {
    case 'SHOW_SIGN_IN':
      return Object.assign({}, state, {visible: 'sign-in'})
    case 'SHOW_SIGN_UP':
      return Object.assign({}, state, {visible: 'sign-up'})
    default:
      return state
  }
}

module.exports = accountCardReducer
