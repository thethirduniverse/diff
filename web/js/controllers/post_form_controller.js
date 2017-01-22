import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import PostForm from 'components/post_form.jsx'
import { addCategory, removeCategory, updateCategoryFilter, updateErrors, showReview, hideReview } from 'actions/post_form'

const containsFilter = (name, key) => (
  name.toLowerCase().includes(key.toLowerCase())
)

const notSelectedFilter = (currentCategories, name) => (
  !currentCategories.find((c) => (c.name === name))
)

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
    _allCategories: state.category.categories,
    reviewing: state.postForm.reviewing,
    reviewData: state.postForm.reviewData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSecondaryButtonClick: () => {
      dispatch(reset('post-form'))
    },
    onRequestDelete: (id) => {
      dispatch(removeCategory(id))
    },
    onUpdateCategoryInput: (text) => {
      dispatch(updateCategoryFilter(text))
    },
    onAbandonReviewClicked: () => {
      dispatch(hideReview())
    },
    _dispatch: dispatch
  }
}

const mergeProps = (s, d, o) => {
  const {target, reviewData, _allCategories, categories} = s
  const {_dispatch} = d
  return {
    ...s,
    ...d,
    ...o,
    onNewCategoryRequest: (text, idx) => {
      let cat
      if (idx === -1) {
        cat = _allCategories.find((c) => (containsFilter(c.name, text) && notSelectedFilter(categories, c.name)))
      } else {
        cat = _allCategories.find((c) => (c.name === text))
      }
      if (cat) {
        _dispatch(addCategory(cat))
      }
    },
    onSubmit: (data) => {
      _dispatch(showReview(
        {
          post: target
        },
        {
          ...data,
          post: {
            ...data.post,
            category_ids: s.categories.map((c) => (c.id))
          }
        }
      ))
    },
    onConfirmReviewClicked: () => {
      $.ajax({
        url: '/api/posts',
        type: 'POST',
        data: reviewData.new
      })
        .done((res) => {
          _dispatch(push('/posts/' + res.post.id))
          _dispatch(updateErrors({}))
          _dispatch(hideReview())
          _dispatch(reset('post-form'))
        })
        .fail((res) => {
          _dispatch(updateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostForm)
