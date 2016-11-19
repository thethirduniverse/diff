import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import ReplyForm from 'components/reply_form.jsx'
import { replyFormUpdateErrors,  replyFormPostedReplyTarget, replyFormPostedReply } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.replyForm.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
      data.reply.topic_id = ownProps.topicID
      $.post('/api/replies', data)
        .done((res) => {
          dispatch(replyFormUpdateErrors({}))
          dispatch(reset('reply-form'))
          dispatch(replyFormPostedReply(replyFormPostedReplyTarget.topic, res.reply))
        })
        .fail((res) => {
          dispatch(replyFormUpdateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm)
