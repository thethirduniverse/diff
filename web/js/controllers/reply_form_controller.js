import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import ReplyForm from 'components/reply_form.jsx'
import { replyFormUpdateErrors } from 'actions'

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
        })
        .fail((res) => {
          dispatch(topicFormUpdateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm)
