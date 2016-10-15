import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import TopicForm from 'components/topic_form.jsx'
import { topicFeedReload, topicFormAddCategory, topicFormRemoveCategory, topicFormUpdateCategoryFilter } from 'actions'

const containsFilter = (name, key) => (
  name.toLowerCase().includes(key.toLowerCase())
)

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.topicForm.categories,
    categoryAutoCompletions: state.category.categories.filter(
      (c) => (containsFilter(c.name, state.topicForm.filter))
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
      let cat
      if (idx === -1) {
        cat = categories.find((c) => (containsFilter(c.name, text)))
      } else {
        cat = categories.find((c) => (c.name === text))
      }
      if (cat) {
        dispatch(topicFormAddCategory(cat))
      }
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
