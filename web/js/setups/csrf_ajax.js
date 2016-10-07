import $ from 'jquery'

import { setAjaxCSRFToken } from 'helpers/csrf_token_helpers.js'

export default function() {
  setAjaxCSRFToken($('meta[name="csrf-token"]').attr('content'))
}
