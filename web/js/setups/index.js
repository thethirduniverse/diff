import csrf_ajax from './csrf_ajax'
import material_ui from './material_ui'

export default function() {
  [
    csrf_ajax,
    material_ui
  ].forEach((f) => { f() })
}
