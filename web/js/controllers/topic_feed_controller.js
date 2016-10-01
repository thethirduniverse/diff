import { connect } from 'react-redux'
import $ from 'jquery'
import { push } from 'react-router-redux'
import TopicFeed from '../components/topic_feed.jsx'
import { topicFeedReload } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topics: state.topics.topics
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCardClick: (id) => {
      dispatch(push('/topics/' + id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicFeed)
