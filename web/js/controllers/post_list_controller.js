import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import PostFeed from 'components/post_feed.jsx'
import { profileLoadMorePostedTopics } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.profile.user.posted_posts.posts,
    has_more: state.profile.user.posted_posts.has_more,
    _next_offset: state.profile.user.posted_posts.next_offset,
    _user_id: state.profile.user.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCardClick: (id) => {
      dispatch(push('/posts/' + id))
    },
    _loadMore: (params) => {
      $.get('/api/profiles/load_posts', params)
        .done((res) => {
          dispatch(profileLoadMorePostedTopics(res.posted_posts.posts, res.posted_posts.has_more, res.posted_posts.next_offset))
        })
        .fail((res) => {
          console.log('load more posts from server failed with response:')
          console.log(res)
        })
    }
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const { _next_offset, _user_id } = stateProps
  const { _loadMore } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    loadMore: () => {
      _loadMore({id: _user_id, offset: _next_offset})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(PostFeed)
