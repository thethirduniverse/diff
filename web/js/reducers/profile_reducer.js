const defaultState = {}
import actions from '../actions'

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.profileLoadUser:
      return {user: action.user}
    default:
      return state
  }
}
