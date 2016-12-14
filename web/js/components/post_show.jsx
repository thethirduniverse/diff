import CircularProgress from 'material-ui/CircularProgress'
import React from 'react'

import ComposeReplyCard from 'components/compose_reply_card.jsx'
import PostShowListController from 'controllers/post_show_list_controller.js'
import SignInFirstCardController from 'controllers/sign_in_first_card_controller.js'

const PostShow = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    onComponentWillUnmount: React.PropTypes.func.isRequired,

    postId: React.PropTypes.string.isRequired,
    loaded: React.PropTypes.bool.isRequired,

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
    const posts = this.props.loaded
      ? (<PostShowListController
        hideActions={!this.props.userSignedIn}
        onReplyClicked={this.props.onReplyReplyClicked}
        onReportClicked={this.props.onReportReplyClicked}
      />)
      : (<CircularProgress />)
    const composeReplyContent = this.displayComposeReplyCard()
      ? (<ComposeReplyCard
        topic={this.props.reply_target_topic}
        reply={this.props.reply_target_reply}
          />)
        : null

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        {posts}
        {
          this.props.userSignedIn
            ? composeReplyContent
            : <SignInFirstCardController location={this.props.location} promptText="You have to log in first to write a reply." />
        }
      </div>
    )
  }
})

export default PostShow
