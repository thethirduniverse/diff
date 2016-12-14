import $ from 'jquery'
import { connect } from 'react-redux'

import PostShowList from 'components/post_show_list.jsx'
import { postShowShowPreviousReply, postShowShowNextReply, postShowShowReplyAtIndex, postShowAppendReplies } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    replyTree: state.postShow.replyTree,
    replyIndexes: state.postShow.replyIndexes,
    shouldShowExpandMore: (reply) => {
      const replyTree = state.postShow.replyTree
      const inLastLevel = replyTree[replyTree.length - 1].some((r) => (r.id === reply.id))
      return (
        reply.posts === undefined && inLastLevel
      ) && reply.post_ids !== undefined && reply.post_ids.length > 0
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    leftChevronClicked: (level) => {
      dispatch(postShowShowPreviousReply(level))
    },
    rightChevronClicked: (level) => {
      dispatch(postShowShowNextReply(level))
    },
    paginationDotClicked: (level, index) => {
      dispatch(postShowShowReplyAtIndex(level, index))
    },
    _expandMoreClicked: (replyTree, level, index) => {
      const reply = replyTree[level][index]

      $.get('/api/replies', {'id': reply.id})
        .done((res) => {
          dispatch(postShowAppendReplies(reply.id, res.posts))
        })
        .fail((res) => {
          console.log('expand more failed with response:')
          console.log(res)
        })
    }
  }
}

const merge = (s, d, o) => {
  return {
    ...o,
    ...s,
    ...d,
    expandMoreClicked: (level, index) => {
      d._expandMoreClicked(s.replyTree, level, index)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(PostShowList)