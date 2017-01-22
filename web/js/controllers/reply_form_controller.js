import $ from 'jquery'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import ReplyForm from 'components/reply_form.jsx'
import { postShowMergeLoadedPosts } from 'actions'
import { clearTarget, updateErrors, showReview, hideReview } from 'actions/reply_form'

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.replyForm.errors,
    target: state.replyForm.target,
    reviewing: state.replyForm.reviewing,
    reviewData: state.replyForm.reviewData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSecondaryButtonClick: () => {
      dispatch(reset('reply-form'))
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
      data.post.parent_post_id = target.id

      $.ajax({
        url: '/api/posts/',
        type: 'POST',
        data: data
      })
        .done((res) => {
          _dispatch(postShowMergeLoadedPosts(res.post.parent_post_id, [res.post]))
          _dispatch(updateErrors({}))
          _dispatch(hideReview())
          _dispatch(clearTarget())
          _dispatch(reset('reply-form'))
        })
        .fail((res) => {
          _dispatch(updateErrors(res.responseJSON.errors))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReplyForm)
