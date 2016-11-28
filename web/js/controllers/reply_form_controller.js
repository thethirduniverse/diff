import $ from 'jquery'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import ReplyForm from 'components/reply_form.jsx'
import { replyFormUpdateErrors, topicShowAppendReplies } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.replyForm.errors
  }
}

const formData = (data, ownProps) => {
  if (ownProps.topicID) {
    return {
      ...data,
      reply: {
        ...data.reply,
        topic_id: ownProps.topicID
      }
    }
  } else if (ownProps.replyID) {
    return {
      ...data,
      reply: {
        ...data.reply,
        reply_id: ownProps.replyID
      }
    }
  } else {
    throw new Error('one of topicID and replyID has to be set')
  }
}

const getTarget = (ownProps) => {
  if (ownProps.topicID) {
    return null
  } else if (ownProps.replyID) {
    return ownProps.replyID
  } else {
    throw new Error('one of topicID and replyID has to be set')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
      var newData = formData(data, ownProps)
      $.post('/api/replies', newData)
        .done((res) => {
          dispatch(replyFormUpdateErrors({}))
          dispatch(reset('reply-form'))
          dispatch(topicShowAppendReplies(getTarget(ownProps), [res.reply]))
        })
        .fail((res) => {
          dispatch(replyFormUpdateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm)
