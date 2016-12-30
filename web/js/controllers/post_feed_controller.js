import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import PostFeed from 'components/post_feed.jsx'
import { contentTypes } from 'reducers/post_feed_reducer.js'
import { postFeedLoadMore, postFeedReload } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    has_more: state.posts.content.has_more,
    _content: state.posts.content
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCardClick: (id) => {
      dispatch(push('/posts/' + id))
    },
    _loadMore: (params) => {
      $.get('/api/posts', params)
        .done((res) => {
          dispatch(postFeedLoadMore(res.posts, res.has_more, res.next_offset))
        })
        .fail((res) => {
          console.log('load more posts from server failed with response:')
          console.log(res)
        })
    },
    _requestInitialLoad: (params) => {
      $.get('/api/posts', params)
        .done((res) => {
          dispatch(postFeedReload(res.posts, res.has_more, res.next_offset))
        })
        .fail((res) => {
          console.log('load posts from server failed with response:')
          console.log(res)
        })
    }
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const { _content } = stateProps
  const { _requestInitialLoad } = dispatchProps

  const initialLoadParams = {}

  switch (_content.type) {
    case contentTypes.category:
      initialLoadParams.type = 'category'
      initialLoadParams.category_id = _content.currentCategoryId
      break
    case contentTypes.newest:
      initialLoadParams.type = 'newest'
      break
    case contentTypes.other:
      initialLoadParams.type = 'other'
      break
    default:
      break
  }

  const loadMoreParams = {
    ...initialLoadParams,
    offset: _content.next_offset
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    loadMore: () => {
      dispatchProps._loadMore(loadMoreParams)
    },
    onComponentWillMount: () => {
      if (!_content.loaded) {
        _requestInitialLoad(initialLoadParams)
      }
    },
    onComponentDidUpdate: () => {
      if (!_content.loaded) {
        _requestInitialLoad(initialLoadParams)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(PostFeed)
