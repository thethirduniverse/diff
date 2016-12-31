import actions from 'actions/edits'

const defaultState = {
  edits: [],
  loaded: false
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.load:
      return {
        ...state,
        edits: action.edits,
        loaded: true
      }
    case actions.clear:
      return {
        ...state,
        edits: [],
        loaded: false
      }
    default:
      return state
  }
}
