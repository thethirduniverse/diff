import CircularProgress from 'material-ui/CircularProgress'
import React from 'react'

import ComposeReplyCard from 'components/compose_reply_card.jsx'
import ReplyListController from 'controllers/reply_list_controller.js'
import SignInFirstCardController from 'controllers/sign_in_first_card_controller.js'
import TopicCard from 'components/topic_card.jsx'

const TopicShow = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    onComponentWillUnmount: React.PropTypes.func.isRequired,
    topicID: React.PropTypes.string.isRequired,
    topic: React.PropTypes.object,

    userSignedIn: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,

    location: React.PropTypes.string.isRequired,

    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func,

    onReplyReplyClicked: React.PropTypes.func,
    onReportReplyClicked: React.PropTypes.func,

    reply_target_topic: React.PropTypes.object,
    reply_target_reply: React.PropTypes.object
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  componentWillUnmount: function() {
    this.props.onComponentWillUnmount()
  },

  displayComposeReplyCard: function() {
    return this.props.reply_target_topic != null ||
      this.props.reply_target_reply != null
  },

  render: function() {
    const topicCardContent = this.props.topic
      ? (<TopicCard
        topic={this.props.topic}
        hideActions={!this.props.userSignedIn}
        onReplyClicked={this.props.onReplyClicked}
        onReportClicked={this.props.onReportClicked}
          />)
      : (<CircularProgress />)
    const repliesContent = this.props.topic
      ? (<ReplyListController
          hideActions={!this.props.userSignedIn}
          onReplyClicked={this.props.onReplyReplyClicked}
          onReportClicked={this.props.onReportReplyClicked}
        />)
      : null
    const composeReplyContent = this.displayComposeReplyCard()
      ? (<ComposeReplyCard
        topic={this.props.reply_target_topic}
        reply={this.props.reply_target_reply}
          />)
        : null

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        {topicCardContent}
        {repliesContent}
        {
          this.props.userSignedIn
            ? composeReplyContent
            : <SignInFirstCardController location={this.props.location} promptText="You have to log in first to write a reply." />
        }
      </div>
    )
  }
})

export default TopicShow
