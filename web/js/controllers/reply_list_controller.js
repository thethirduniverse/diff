import { connect } from 'react-redux'

import ReplyList from 'components/reply_list.jsx'
import { topicShowShowPreviousReply, topicShowShowNextReply, topicAppendReplies } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    replyTree: state.topicShow.replyTree,
    replyIndexes: state.topicShow.replyIndexes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    leftChevronClicked: (level) => {
      dispatch(topicShowShowPreviousReply(level))
    },
    rightChevronClicked: (level) => {
      dispatch(topicShowShowNextReply(level))
    },
    _showExpandMore: (replies) => {
      dispatch(topicAppendReplies(replies))
    }
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const { _showExpandMore } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showExpandMore: () => {
      _showExpandMore()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(ReplyList)
