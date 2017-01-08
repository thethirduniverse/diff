const actions = {
  setTarget: 'EDIT_FORM_SET_TARGET',
  clearTarget: 'EDIT_FORM_CLEAR_TARGET',
  updateErrors: 'EDIT_FORM_UPDATE_ERRORS',
  showReview: 'EDIT_FORM_SHOW_REVIEW',
  hideReview: 'EDIT_FORM_HIDE_REVIEW'
}

export const setTarget = (post) => ({
  type: actions.setTarget,
  post
})

export const clearTarget = () => ({
  type: actions.clearTarget
})

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
