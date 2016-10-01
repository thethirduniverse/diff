import csrf_ajax from './csrf_ajax'
import material_ui from './material_ui'
import bootstrap from './bootstrap'

export default function(store) {
  [
    csrf_ajax,
    material_ui,
    bootstrap
  ].forEach((f) => { f(store) })
}
