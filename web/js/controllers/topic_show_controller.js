import $ from 'jquery'
import { connect } from 'react-redux'

import TopicShow from 'components/topic_show.jsx'
import { topicShowLoadTopic, topicShowAppendReplies, replyFormSetTargetTopic, replyFormClearTarget } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topicID: ownProps.params.id,
    topic: state.topicShow.topic,

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
    onReportClicked: () => {
      console.log('report clicked')
    },
    onComponentWillMount: () => {
      $.get('/api/topics/' + ownProps.params.id)
        .done((res) => {
          const {replies, ...rest} = res.topic

          // load topic first since it clears previous replies
          dispatch(topicShowLoadTopic(rest))
          dispatch(topicShowAppendReplies(replies))
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
      d._onReplyClicked(s.topic)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(TopicShow)
