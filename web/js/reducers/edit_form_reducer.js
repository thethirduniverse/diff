import actions from 'actions/edit_form'

const defaultState = {
  display: false,
  errors: {},
  target: null,
  reviewing: false,
  reviewData: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.updateErrors:
      return {
        ...state,
        errors: action.errors
      }
    case actions.setTarget:
      return {
        ...state,
        target: action.post,
        display: true
      }
    case actions.clearTarget:
      return {
        ...state,
        target: null,
        display: false
      }
    case actions.showReview:
      return {
        ...state,
        reviewing: true,
        reviewData: {
          old: action.oldData,
          new: action.newData
        }
      }
    case actions.hideReview:
      return {
        ...state,
        reviewing: false,
        reviewData: null
      }
    default:
      return state
  }
}
