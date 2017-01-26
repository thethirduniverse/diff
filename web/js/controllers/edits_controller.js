import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EditIndex from 'components/edits/edit_index.jsx'
import { requestEditsLoad } from 'actions/edits'
import { reportEdit } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    edits: state.edits.edits,
    _state: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReportEditClicked: (edit) => {
      dispatch(reportEdit(edit))
    },
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
    },
    onHeaderClicked: (edit) => {
      _dispatch(push('/profiles/' + edit.user.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(EditIndex)
