import actions from 'actions'

const defaultState = {
  message: '',
  code: '',
  oldCodes: [],
  generated: false,
  limitExceeded: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.inviteShowCode:
      return {
        ...defaultState,
        code: action.code,
        generated: true
      }
    case actions.inviteShowOldCodes:
      return {
        ...defaultState,
        message: action.message,
        oldCodes: action.codes,
        limitExceeded: true
      }
    case actions.inviteShowError:
      return {
        ...defaultState,
        message: action.message
      }
    default:
      return state
  }
}
