const actions = {
  addCategory: 'POST_FORM_ADD_CATEGORY',
  removeCategory: 'POST_FORM_REMOVE_CATEGORY',
  updateCategoryFilter: 'POST_FORM_UPDATE_CATEGORY_FILTER',
  updateErrors: 'POST_FORM_UPDATE_ERRORS',
  showReview: 'POST_FORM_SHOW_REVIEW',
  hideReview: 'POST_FORM_HIDE_REVIEW'
}

export const addCategory = (category) => {
  return {
    type: actions.addCategory,
    category
  }
}

export const removeCategory = (categoryId) => {
  return {
    type: actions.removeCategory,
    categoryId
  }
}

export const updateCategoryFilter = (filter) => {
  return {
    type: actions.updateCategoryFilter,
    filter
  }
}

export const updateErrors = (errors) => ({
  type: actions.updateErrors,
  errors
})

export const showReview = (oldData, newData) => ({
  type: actions.showReview,
  oldData,
  newData
})

export const hideReview = () => ({
  type: actions.hideReview
})

export default actions
