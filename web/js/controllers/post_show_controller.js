import $ from 'jquery'
import { connect } from 'react-redux'

import PostShow from 'components/post_show.jsx'
import { postShowLoadTopic, postShowAppendReplies, postFormUpdateTarget, postFormClearTarget, reportPost } from 'actions'

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
    onComponentWillMount: () => {
      const { id } = ownProps.params
      $.get('/api/posts/' + id)
        .done((res) => {
          const {posts, ...rest} = res.post

          // load post first since it clears previous replies
          dispatch(postShowLoadTopic(rest))
          dispatch(postShowAppendReplies(parseInt(id), posts))
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

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
