import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import TopicForm from 'components/topic_form.jsx'
import { topicFeedReload, topicFormRemoveCategory } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.topicForm.categories
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
    },
    onRequestDelete: (id) => {
      dispatch(topicFormRemoveCategory(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm)
