import $ from 'jquery'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { push } from 'react-router-redux'

import PostShow from 'components/post_show.jsx'
import { HOST_URL } from '~/host.js'
import { postShowLoadTopic, postShowMergePostPlaceholders, postShowMergeLoadedPosts, reportPost, shareLinkShow, postOptimisticUpvote, postOptimisticCancelUpvote } from 'actions'
import { editsClear } from '~/actions/edits'
import { setTarget as editFormSetTarget, clearTarget as editFormClearTarget } from '~/actions/edit_form'
import { setTarget as replyFormSetTarget, clearTarget as replyFormClearTarget } from '~/actions/reply_form'

const mapStateToProps = (state, ownProps) => {
  return {
    postId: ownProps.params.id,
    loaded: state.postShow.replyTree.length > 0,

    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user,

    target: state.editForm.target ? state.editForm.target : state.replyForm.target,

    location: ownProps.location.pathname,

    showEditForm: state.editForm.display,
    showReplyForm: state.replyForm.display
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReplyClicked: (post) => {
      dispatch(editFormClearTarget()) // this is bad
      dispatch(replyFormSetTarget(post))
      dispatch(initialize('reply-form', {}))
    },
    onEditClicked: (post) => {
      dispatch(replyFormClearTarget()) // this is bad
      dispatch(editFormSetTarget(post))
      // work around since redux form initialization does not seem to be working
      dispatch(initialize('edit-form', {
        post: {
          content: post.content
        }
      }))
    },
    onReportClicked: (post) => {
      dispatch(reportPost(post))
    },
    onShareClicked: (post) => {
      dispatch(shareLinkShow(HOST_URL + '/posts/' + post.id))
    },
    onHistoryClicked: (post) => {
      dispatch(editsClear())
      dispatch(push('/posts/' + post.id + '/edits'))
    },
    onUpvoteClicked: (post) => {
      dispatch(postOptimisticUpvote(post.id))
      $.post('/api/posts/' + post.id + '/upvotes')
    },
    onCancelUpvoteClicked: (post) => {
      dispatch(postOptimisticCancelUpvote(post.id))
      $.post('/api/posts/' + post.id + '/upvotes', {_method: 'DELETE'})
    },
    onUserHeaderClicked: (user) => {
      dispatch(push('/profiles/' + user.id))
    },
    onComponentWillMount: () => {
      const { id } = ownProps.params
      $.get('/api/posts/' + id)
        .done((res) => {
          const {posts, ...rest} = res.post

          // load post first since it clears previous replies
          dispatch(postShowLoadTopic(rest))
          appendReplies(dispatch, rest.id, posts, rest.post_ids)
        })
        .fail((res) => {
          console.log('load post with response:')
          console.log(res)
        })
    },
    onComponentWillUnmount: () => {
    }
  }
}

const appendReplies = (dispatch, parentId, posts, postIds) => {
  if (!posts || posts.length === 0) {
    return
  }
  posts.forEach((post) => {
    const {posts: child_posts, ...rest} = post
    dispatch(postShowMergeLoadedPosts(parentId, [rest]))
    if (postIds !== undefined && postIds.length > 0) {
      dispatch(postShowMergePostPlaceholders(parentId, postIds))
    }
    appendReplies(dispatch, rest.id, child_posts, rest.postIds)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
