import { connect } from 'react-redux'

import ShareDialog from 'components/share_dialog.jsx'
import { shareLinkDismiss } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    link: state.share.link
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dismiss: () => {
      dispatch(shareLinkDismiss())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareDialog)
