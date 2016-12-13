import $ from 'jquery'
import { connect } from 'react-redux'

import PostShow from 'components/post_show.jsx'
import { topicShowLoadTopic, topicShowAppendReplies, replyFormSetTargetTopic, replyFormSetTargetReply, replyFormClearTarget, reportTopic, reportReply } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    postId: ownProps.params.id,
    loaded: state.topicShow.replyTree.length > 0,

    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user,

    location: ownProps.location.pathname,

    reply_target_topic: state.replyForm.target_topic,
    reply_target_reply: state.replyForm.target_reply
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _onReplyClicked: (topic) => {
      dispatch(replyFormSetTargetTopic(topic))
    },
    _onReportClicked: (topic) => {
      dispatch(reportTopic(topic))
    },
    onReplyReplyClicked: (reply) => {
      dispatch(replyFormSetTargetReply(reply))
    },
    onReportReplyClicked: (reply) => {
      dispatch(reportReply(reply))
    },
    onComponentWillMount: () => {
      const { id } = ownProps.params
      $.get('/api/posts/' + id)
        .done((res) => {
          const {posts, ...rest} = res.post

          // load topic first since it clears previous replies
          dispatch(topicShowLoadTopic(rest))
          dispatch(topicShowAppendReplies(parseInt(id), posts))
        })
        .fail((res) => {
          console.log('load topic with response:')
          console.log(res)
        })
    },
    onComponentWillUnmount: () => {
      dispatch(replyFormClearTarget())
    }
  }
}

const merge = (s, d, o) => {
  return {
    ...o,
    ...s,
    ...d,
    onReplyClicked: () => {
      d._onReplyClicked(s.post)
    },
    onReportClicked: () => {
      d._onReportClicked(s.post)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(PostShow)
