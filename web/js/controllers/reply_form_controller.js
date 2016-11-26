import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import ReplyForm from 'components/reply_form.jsx'
import { replyFormUpdateErrors,  replyTargets, replyFormPostedReply } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.replyForm.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
      if (ownProps.topicID) {
        data.reply.topic_id = ownProps.topicID
      } else if (ownProps.replyID) {
        data.reply.reply_id = ownProps.replyID
      } else {
        throw new Error('one of topicID and replyID has to be set')
      }
      $.post('/api/replies', data)
        .done((res) => {
          dispatch(replyFormUpdateErrors({}))
          dispatch(reset('reply-form'))
          dispatch(replyFormPostedReply(replyTargets.topic, res.reply))
        })
        .fail((res) => {
          dispatch(replyFormUpdateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm)
