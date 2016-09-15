import actions from '../actions'

export default (state = {'visible': 'sign-in'}, action) => {
  switch (action.type) {
    case actions.accountCardShowSignIn:
      return Object.assign({}, state, {visible: 'sign-in'})
    case actions.accountCardShowSignUp:
      return Object.assign({}, state, {visible: 'sign-up'})
    default:
      return state
  }
}
