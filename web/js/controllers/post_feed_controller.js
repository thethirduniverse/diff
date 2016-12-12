import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import PostFeed from 'components/post_feed.jsx'
import { contentTypes } from 'reducers/topic_feed_reducer.js'
import { topicFeedLoadMore, topicFeedReload } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topics: state.topics.topics,
    has_more: state.topics.content.has_more,
    _content: state.topics.content,
    _categories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCardClick: (id) => {
      dispatch(push('/topics/' + id))
    },
    _loadMore: (params) => {
      $.get('/api/topics', params)
        .done((res) => {
          dispatch(topicFeedLoadMore(res.topics, res.has_more, res.next_offset))
        })
        .fail((res) => {
          console.log('load more topics from server failed with response:')
          console.log(res)
        })
    },
    _requestInitialLoad: (params) => {
      $.get('/api/topics', params)
        .done((res) => {
          dispatch(topicFeedReload(res.topics, res.has_more, res.next_offset))
        })
        .fail((res) => {
          console.log('load topics from server failed with response:')
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