import { connect } from 'react-redux'
import $ from 'jquery'
import TopicFeed from '../components/topic_feed.jsx'
import { topicFeedReload } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topics: state.topics.topics
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.get('/api/topics')
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicFeed)
