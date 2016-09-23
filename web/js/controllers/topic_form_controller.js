import { connect } from 'react-redux'
import $ from 'jquery'
import TopicForm from '../components/topic_form.jsx'
import { topicFeedReload } from '../actions'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
      $.post('/api/topics', data)
        .done((res) => {
          dispatch(push('/topics/' + res.topic.id))
          dispatch(reset('topic-form'))
        })
        .fail((res) => {
          console.log('create new topic failed with response:')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm)
