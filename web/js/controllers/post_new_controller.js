import { connect } from 'react-redux'

import PostNew from 'components/post_new.jsx'
import { postFormCreateRoot } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      dispatch(postFormCreateRoot())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostNew)
