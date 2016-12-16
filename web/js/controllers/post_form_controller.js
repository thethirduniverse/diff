import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import PostForm from 'components/post_form.jsx'
import { postFormAddCategory, postFormRemoveCategory, postFormUpdateCategoryFilter, postFormUpdateErrors, postShowMergeLoadedPosts } from 'actions'

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
  // posting as reply
  if (ownProps.parentPostId) {
    return {
      ...data,
      post: {
        content: data.post.content,
        parent_post_id: ownProps.parentPostId
      }
    }
  }

  return data
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.postForm.categories,
    categoryAutoCompletions: state.category.categories.filter(
      (c) => (containsFilter(c.name, state.postForm.filter))
    ).filter(
      (c) => (notSelectedFilter(state.postForm.categories, c.name))
    ).map(
      (c) => (c.name)
    ),
    categoryInput: state.postForm.filter,
    errors: state.postForm.errors,
    creatingRoot: ownProps.parentPostId === undefined,
    _allCategories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _onSubmit: (data) => {
      $.post('/api/posts', formData(data, ownProps))
        .done((res) => {
          if (ownProps.action === ActionTypes.insert) {
            dispatch(postShowMergeLoadedPosts(ownProps.parentPostId, [res.post]))
          } else {
            dispatch(push('/posts/' + res.post.id))
          }
          dispatch(postFormUpdateErrors({}))
          dispatch(reset('post-form'))
        })
        .fail((res) => {
          dispatch(postFormUpdateErrors(res.responseJSON.errors))
        })
    },
    onRequestDelete: (id) => {
      dispatch(postFormRemoveCategory(id))
    },
    onUpdateCategoryInput: (text) => {
      dispatch(postFormUpdateCategoryFilter(text))
    },
    _onNewCategoryRequest: (allCategories, currentCategories, text, idx) => {
      let cat
      if (idx === -1) {
        cat = allCategories.find((c) => (containsFilter(c.name, text) && notSelectedFilter(currentCategories, c.name)))
      } else {
        cat = allCategories.find((c) => (c.name === text))
      }
      if (cat) {
        dispatch(postFormAddCategory(cat))
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
