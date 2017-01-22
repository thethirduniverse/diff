const actions = {
  setTarget: 'REPLY_FORM_SET_TARGET',
  clearTarget: 'REPLY_FORM_CLEAR_TARGET',
  updateErrors: 'REPLY_FORM_UPDATE_ERRORS',
  showReview: 'REPLY_FORM_SHOW_REVIEW',
  hideReview: 'REPLY_FORM_HIDE_REVIEW'
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
