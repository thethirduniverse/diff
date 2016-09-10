import $ from 'jquery'

export const setAjaxCSRFToken = (new_token) => {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': new_token
    }
  });
}

export const updatePageAndAjaxCSRFToken = (new_token) => {
  $('meta[name="csrf-token"]').attr('content', new_token)
  setAjaxCSRFToken(new_token)
}
