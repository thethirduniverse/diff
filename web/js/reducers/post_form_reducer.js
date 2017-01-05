import actions from 'actions'

export const PostFormActionTypes = {
  reply: 'REPLY',
  edit: 'EDIT',
  createRoot: 'CREATE_ROOT',
  none: 'NONE'
}

const defaultState = {
  categories: [],
  filter: '',
  errors: {},
  target: null,
  actionType: PostFormActionTypes.none,

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
    case actions.postFormCreateRoot:
      return {
        ...state,
        target: null,
        actionType: PostFormActionTypes.createRoot
      }
    case actions.postFormUpdateReplyTarget:
      return {
        ...state,
        target: action.post,
        actionType: PostFormActionTypes.reply
      }
    case actions.postFormUpdateEditTarget:
      return {
        ...state,
        target: action.post,
        actionType: PostFormActionTypes.edit
      }
    case actions.postFormClearTarget:
      return {
        ...state,
        target: null
      }
    case actions.postFormShowReview:
      return {
        ...state,
        reviewing: true,
        reviewData: {
          old: action.oldData,
          new: action.newData
        }
      }
    case actions.postFormHideReview:
      return {
        ...state,
        reviewing: false,
        reviewData: null
      }
    default:
      return state
  }
}
