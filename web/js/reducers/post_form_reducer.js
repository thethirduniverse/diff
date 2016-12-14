import actions from 'actions'

const defaultState = {
  categories: [],
  filter: '',
  errors: {},
  target: null
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
    case actions.postFormAddCategory:
      return {
        ...state,
        categories: [...state.categories, action.category].sort(sortByName),
        filter: ''
      }
    case actions.postFormRemoveCategory:
      return {
        ...state,
        categories: state.categories.filter((c) => (c.id !== action.categoryId)).sort(sortByName)
      }
    case actions.postFormUpdateCategoryFilter:
      return {
        ...state,
        filter: action.filter
      }
    case actions.postFormUpdateErrors:
      return {
        ...state,
        errors: action.errors
      }
    case actions.postFormUpdateTarget:
      return {
        ...state,
        target: action.post
      }
    case actions.postFormClearTarget:
      return {
        ...state,
        target: null
      }
    default:
      return state
  }
}
