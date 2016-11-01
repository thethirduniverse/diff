import CircularProgress from 'material-ui/CircularProgress'
import React from 'react'

import NoReplyCard from 'components/no_reply_card.jsx'
import ReplyList from 'components/reply_list.jsx'
import TopicCard from 'components/topic_card.jsx'

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
    const repliesContent = this.props.topic
      ? (<ReplyList replies={this.props.topic.replies} />)
      : null

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        {topicCardContent}
        {repliesContent}
        <NoReplyCard topicID={this.props.topicID}/>
      </div>
    )
  }
})

export default TopicShow
