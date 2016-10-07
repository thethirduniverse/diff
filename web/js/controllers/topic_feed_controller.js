import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TopicFeed from 'components/topic_feed.jsx'
import { contentTypes } from 'reducers/topic_feed_reducer.js'
import { topicFeedReload } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topics: state.topics.topics,
    _content: state.topics.content,
    _categories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCardClick: (id) => {
      dispatch(push('/topics/' + id))
    },
    _requestInitialLoad: (params) => {
      $.get('/api/topics', params)
        .done((res) => {
          dispatch(topicFeedReload(res.topics))
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

  var params
  switch(_content.type) {
    case contentTypes.category:
      const category = _categories[_content.currentCategoryIndex]
      params = {category_id: category.id}
      break
    case contentTypes.newest:
    default:
      params = {}
  }

  if (!_content.loaded) {
    _requestInitialLoad(params)
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(TopicFeed)
