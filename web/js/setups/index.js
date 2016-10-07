import csrf_ajax from 'setups/csrf_ajax.js'
import material_ui from 'setups/material_ui.js'
import bootstrap from 'setups/bootstrap.js'

export default function(store) {
  [
    csrf_ajax,
    material_ui,
    bootstrap
  ].forEach((f) => { f(store) })
}
