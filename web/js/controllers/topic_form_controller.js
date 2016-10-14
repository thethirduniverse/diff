import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import TopicForm from 'components/topic_form.jsx'
import { topicFeedReload, topicFormAddCategory, topicFormRemoveCategory, topicFormUpdateCategoryFilter } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.topicForm.categories,
    categoryAutoCompletions: state.category.categories.filter(
      (c) => (c.name.toLowerCase().includes(state.topicForm.filter.toLowerCase()))
    ).map(
      (c) => (c.name)
    ),
    categoryInput: state.topicForm.filter,
    _allCategories: state.category.categories,
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
    },
    onUpdateCategoryInput: (text) => {
      dispatch(topicFormUpdateCategoryFilter(text))
    },
    _onNewCategoryRequest: (categories, text, idx) => {
      dispatch(topicFormAddCategory(categories.find((c) => (c.name === text))))
    }
  }
}

const mergeProps = (s, d, o) => {
  return {
    ...s,
    ...d,
    ...o,
    onNewCategoryRequest: (text, idx) => {
      d._onNewCategoryRequest(s._allCategories, text, idx)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TopicForm)
