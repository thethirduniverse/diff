import csrfAjax from 'setups/csrf_ajax.js'
import materialUI from 'setups/material_ui.js'
import bootstrap from 'setups/bootstrap.js'

export default function(store) {
  [
    csrfAjax,
    materialUI,
    bootstrap
  ].forEach((f) => { f(store) })
}
