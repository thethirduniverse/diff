import { connect } from 'react-redux'

import ReplyList from 'components/reply_list.jsx'
import { topicShowShowPreviousReply, topicShowShowNextReply, topicShowShowReplyAtIndex } from 'actions'

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
    paginationDotClicked: (level, index) => {
      dispatch(topicShowShowReplyAtIndex(level, index))
    },
    expandMoreClicked: (level, index) => {
      console.log('expand more clicked for level: ' + level + ' index: ' + index)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyList)
