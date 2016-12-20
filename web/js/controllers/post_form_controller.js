import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import PostForm from 'components/post_form.jsx'
import { postFormAddCategory, postFormRemoveCategory, postFormUpdateCategoryFilter, postFormUpdateErrors, postShowMergeLoadedPosts } from 'actions'
import { PostFormActionTypes as actionTypes } from 'reducers/post_form_reducer.js'

const containsFilter = (name, key) => (
  name.toLowerCase().includes(key.toLowerCase())
)

const notSelectedFilter = (currentCategories, name) => (
  !currentCategories.find((c) => (c.name === name))
)

const formData = (data, target) => {
  // posting as reply
  if (target) {
    return {
      ...data,
      post: {
        content: data.post.content,
        parent_post_id: target.id
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
    target: state.postForm.target,
    actionType: state.postForm.actionType,
    _allCategories: state.category.categories
  }
}

const getEndPoint = (target, actionType) => {
  switch (actionType) {
    case actionTypes.edit:
      return '/api/posts/' + target.id
    default:
      return '/api/posts'
  }
}

const getHttpMethod = (actionType) => {
  switch (actionType) {
    case actionTypes.edit:
      return 'PUT'
    default:
      return 'POST'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _onSubmit: (target, actionType, data) => {
      $.ajax({
        url: getEndPoint(target, actionType),
        type: getHttpMethod(actionType),
        data: formData(data, target)
      })
        .done((res) => {
          if (actionType === actionTypes.reply || actionType === actionTypes.edit) {
            dispatch(postShowMergeLoadedPosts(res.post.parent_post_id, [res.post]))
          } else if (actionType === actionTypes.createRoot) {
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
  const {target, actionType} = s
  return {
    ...s,
    ...d,
    ...o,
    onNewCategoryRequest: (text, idx) => {
      d._onNewCategoryRequest(s._allCategories, s.categories, text, idx)
    },
    onSubmit: (data) => {
      d._onSubmit(target, actionType, {
        ...data,
        'post[category_ids]': s.categories.map((c) => (c.id))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostForm)
