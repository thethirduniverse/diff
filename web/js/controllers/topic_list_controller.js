import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TopicFeed from 'components/topic_feed.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
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
