import actions from 'actions'

const defaultState = {
  error: {
    description: '',
    visible: false
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.appShowError:
      return {
        ...state,
        error: {
          description: action.description,
          visible: true
        }
      }
    case actions.appDismissError:
      return {
        ...state,
        error: {
          description: '',
          visible: false
        }
      }
    default:
      return state
  }
}
