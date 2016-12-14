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
    _content: state.posts.content,
    _categories: state.category.categories
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
  const { _content, _categories } = stateProps
  const { _requestInitialLoad } = dispatchProps

  var initialLoadParams = {}
  var loadMoreParams = { offset: _content.next_offset }

  switch (_content.type) {
    case contentTypes.category:
      const category = _categories[_content.currentCategoryIndex]
      initialLoadParams.category_id = category.id
      loadMoreParams.category_id = category.id
      break
    case contentTypes.newest:
    default:
      break
  }

  if (!_content.loaded) {
    _requestInitialLoad(initialLoadParams)
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    loadMore: () => {
      dispatchProps._loadMore(loadMoreParams)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(PostFeed)
