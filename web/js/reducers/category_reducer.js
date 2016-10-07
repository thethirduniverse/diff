import actions from 'actions'

const defaultState = {
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.categoryLoad:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}
