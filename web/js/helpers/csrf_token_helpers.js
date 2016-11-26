import $ from 'jquery'

export const setAjaxCSRFToken = (newToken) => {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': newToken
    }
  })
}

export const updatePageAndAjaxCSRFToken = (newToken) => {
  $('meta[name="csrf-token"]').attr('content', newToken)
  setAjaxCSRFToken(newToken)
}
