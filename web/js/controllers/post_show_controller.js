import $ from 'jquery'
import { connect } from 'react-redux'

import PostShow from 'components/post_show.jsx'
import { HOST_URL } from '~/host.js'
import { postShowLoadTopic, postShowMergePostPlaceholders, postShowMergeLoadedPosts, postFormUpdateTarget, postFormClearTarget, reportPost, shareLinkShow } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    postId: ownProps.params.id,
    loaded: state.postShow.replyTree.length > 0,

    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user,

    target: state.postForm.target,

    location: ownProps.location.pathname
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReplyClicked: (post) => {
      dispatch(postFormUpdateTarget(post))
    },
    onReportClicked: (post) => {
      dispatch(reportPost(post))
    },
    onShareClicked: (post) => {
      dispatch(shareLinkShow(HOST_URL + '/posts/' + post.id))
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
      dispatch(postFormClearTarget())
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
