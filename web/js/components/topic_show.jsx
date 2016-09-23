import React from 'react'
import TopicCard from './topic_card.jsx'
import NoReplyCard from './no_reply_card.jsx'
import CircularProgress from 'material-ui/CircularProgress'

const TopicShow = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    topicID: React.PropTypes.string.isRequired,
    topic: React.PropTypes.object
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    const topicCardContent = this.props.topic
      ? (<TopicCard topic={this.props.topic} />)
      : (<CircularProgress />)

    return (
      <div>
        {topicCardContent}
        <NoReplyCard />
      </div>
    )
  }
})

export default TopicShow
