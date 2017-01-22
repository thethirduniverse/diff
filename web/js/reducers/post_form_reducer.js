import actions from 'actions/post_form'

const defaultState = {
  categories: [],
  filter: '',
  errors: {},
  target: null,

  reviewing: false,
  reviewData: null
}

const sortByName = (c1, c2) => {
  if (c1.name > c2.name) {
    return 1
  } else if (c1.name < c2.name) {
    return -1
  }
  return 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.addCategory:
      return {
        ...state,
        categories: [...state.categories, action.category].sort(sortByName),
        filter: ''
      }
    case actions.removeCategory:
      return {
        ...state,
        categories: state.categories.filter((c) => (c.id !== action.categoryId)).sort(sortByName)
      }
    case actions.updateCategoryFilter:
      return {
        ...state,
        filter: action.filter
      }
    case actions.updateErrors:
      return {
        ...state,
        errors: action.errors
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
