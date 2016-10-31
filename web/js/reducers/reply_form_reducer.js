import actions from 'actions'

const defaultState = {
  errors: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.replyFormUpdateErrors:
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state
  }
}
