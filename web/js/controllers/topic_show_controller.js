import $ from 'jquery'
import { connect } from 'react-redux'

import TopicShow from 'components/topic_show.jsx'
import { topicShowLoadTopic } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    topicID: ownProps.params.id,
    topic: state.topicShow.topic,

    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user,

    location: ownProps.location.pathname
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.get('/api/topics/' + ownProps.params.id)
        .done((res) => {
          dispatch(topicShowLoadTopic(res.topic))
        })
        .fail((res) => {
          console.log('load topic with response:')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicShow)
