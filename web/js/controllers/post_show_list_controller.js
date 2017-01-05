import $ from 'jquery'
import { connect } from 'react-redux'

import PostShowList from 'components/post_show_list.jsx'
import { postShowShowPreviousReply, postShowShowNextReply, postShowShowReplyAtIndex, postShowMergeLoadedPosts, postShowStartLoadPost, postShowCancelLoadPost, postShowFinishedLoadPost } from 'actions'

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
    requestPostLoad: (postId) => {
      $.get('/api/posts/' + postId, {'single_post': true})
        .done((res) => {
          dispatch(postShowFinishedLoadPost(res.post))
        })
        .fail((res) => {
          console.log('request load failed with response:')
          console.log(res)
        })
      dispatch(postShowStartLoadPost(postId))
    },
    cancelPostLoad: (postId) => {
      console.log('cancel post invoked')
      dispatch(postShowCancelLoadPost(postId))
    },
    _expandMoreClicked: (replyTree, level, index) => {
      const reply = replyTree[level][index]

      $.get('/api/posts/' + reply.id + '/replies')
        .done((res) => {
          dispatch(postShowMergeLoadedPosts(reply.id, res.posts))
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
