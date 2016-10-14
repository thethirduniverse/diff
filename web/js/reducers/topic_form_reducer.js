import actions from 'actions'

const defaultState = {
  categories: [],
  filter: ''
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
    case actions.topicFormAddCategory:
      return {
        ...state,
        categories: [...state.categories, action.category].sort(sortByName),
        filter: ''
      }
    case actions.topicFormRemoveCategory:
      const id = action.categoryID
      return {
        ...state,
        categories: state.categories.filter((c) => (c.id != action.categoryId)).sort(sortByName)
      }
    case actions.topicFormUpdateCategoryFilter:
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
