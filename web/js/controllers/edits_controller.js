import { connect } from 'react-redux'

import EditIndex from 'components/edits/edit_index.jsx'
import { requestEditsLoad } from 'actions/edits'

const mapStateToProps = (state, ownProps) => {
  return {
    edits: state.edits.edits,
    _state: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _dispatch: dispatch
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const postId = ownProps.params.id
  const { _state } = stateProps
  const { _dispatch } = dispatchProps
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onComponentWillMount: () => {
      if (!_state.edits.loaded) {
        requestEditsLoad(postId, _dispatch)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(EditIndex)
