import $ from 'jquery'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import EditForm from 'components/edit_form.jsx'
import { postShowMergeLoadedPosts } from 'actions'
import { clearTarget, updateErrors, showReview, hideReview } from 'actions/edit_form'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.editForm.errors,
    target: state.editForm.target,
    reviewing: state.editForm.reviewing,
    reviewData: state.editForm.reviewData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSecondaryButtonClick: () => {
      dispatch(reset('edit-form'))
    },
    onAbandonReviewClicked: () => {
      dispatch(hideReview())
    },
    _dispatch: dispatch
  }
}

const mergeProps = (s, d, o) => {
  const {target, reviewData} = s
  const {_dispatch} = d
  return {
    ...s,
    ...d,
    ...o,
    onSubmit: (data) => {
      _dispatch(showReview(
        { post: target },
        data
      ))
    },
    onConfirmReviewClicked: () => {
      const data = reviewData.new
      $.ajax({
        url: '/api/posts/' + target.id,
        type: 'PUT',
        data: data
      })
        .done((res) => {
          _dispatch(postShowMergeLoadedPosts(res.post.parent_post_id, [res.post]))
          _dispatch(updateErrors({}))
          _dispatch(hideReview())
          _dispatch(clearTarget())
          _dispatch(reset('edit-form'))
        })
        .fail((res) => {
          _dispatch(updateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EditForm)
