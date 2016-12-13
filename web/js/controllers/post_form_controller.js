import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import PostForm from 'components/post_form.jsx'
import { topicFormAddCategory, topicFormRemoveCategory, topicFormUpdateCategoryFilter, topicFormUpdateErrors, topicShowAppendReplies } from 'actions'

export const ActionTypes = {
  insert: 'insert',
  redirect: 'redirect'
}

const containsFilter = (name, key) => (
  name.toLowerCase().includes(key.toLowerCase())
)

const notSelectedFilter = (currentCategories, name) => (
  !currentCategories.find((c) => (c.name === name))
)

const formData = (data, ownProps) => {
  if (ownProps.parentPostId) {
    return {
      ...data,
      post: {
        ...data.post,
        parent_post_id: ownProps.parentPostId
      }
    }
  }
  return data
}

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
      $.post('/api/posts', formData(data, ownProps))
        .done((res) => {
          if (ownProps.action === ActionTypes.insert) {
            dispatch(topicShowAppendReplies(ownProps.parentPostId, [res.post]))
          } else {
            dispatch(push('/posts/' + res.post.id))
          }
          dispatch(topicFormUpdateErrors({}))
          dispatch(reset('post-form'))
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
        'post[category_ids]': s.categories.map((c) => (c.id))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostForm)
