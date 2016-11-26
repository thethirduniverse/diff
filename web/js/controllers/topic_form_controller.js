import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import TopicForm from 'components/topic_form.jsx'
import { topicFormAddCategory, topicFormRemoveCategory, topicFormUpdateCategoryFilter, topicFormUpdateErrors } from 'actions'

const containsFilter = (name, key) => (
  name.toLowerCase().includes(key.toLowerCase())
)

const notSelectedFilter = (currentCategories, name) => (
  !currentCategories.find((c) => (c.name === name))
)

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.topicForm.categories,
    categoryAutoCompletions: state.category.categories.filter(
      (c) => (containsFilter(c.name, state.topicForm.filter))
    ).filter(
      (c) => (notSelectedFilter(state.topicForm.categories, c.name))
    ).map(
      (c) => (c.name)
    ),
    categoryInput: state.topicForm.filter,
    errors: state.topicForm.errors,
    _allCategories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _onSubmit: (data) => {
      $.post('/api/topics', data)
        .done((res) => {
          dispatch(topicFormUpdateErrors({}))
          dispatch(push('/topics/' + res.topic.id))
          dispatch(reset('topic-form'))
        })
        .fail((res) => {
          dispatch(topicFormUpdateErrors(res.responseJSON.errors))
        })
    },
    onRequestDelete: (id) => {
      dispatch(topicFormRemoveCategory(id))
    },
    onUpdateCategoryInput: (text) => {
      dispatch(topicFormUpdateCategoryFilter(text))
    },
    _onNewCategoryRequest: (allCategories, currentCategories, text, idx) => {
      let cat
      if (idx === -1) {
        cat = allCategories.find((c) => (containsFilter(c.name, text) && notSelectedFilter(currentCategories, c.name)))
      } else {
        cat = allCategories.find((c) => (c.name === text))
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
      d._onNewCategoryRequest(s._allCategories, s.categories, text, idx)
    },
    onSubmit: (data) => {
      d._onSubmit({
        ...data,
        'topic[category_ids]': s.categories.map((c) => (c.id))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TopicForm)
