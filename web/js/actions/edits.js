import $ from 'jquery'
import { appShowError } from 'actions'

const actions = {
  load: 'EDITS_LOAD',
  clear: 'EDITS_CLEAR'
}

export const editsLoad = (edits) => ({
  type: actions.load,
  edits
})

export const editsClear = () => ({ type: actions.clear })

export const requestEditsLoad = (postId, dispatch) => {
  $.get('/api/posts/' + postId + '/edits')
    .done((res) => {
      dispatch(editsLoad(res.edits))
    })
    .fail((res) => {
      dispatch(appShowError('Sorry, getting edits for post ' + postId + ' failed', res))
      console.log('log out failed with response')
      console.log(res)
    })
}

export default actions
