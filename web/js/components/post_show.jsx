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
    onEditClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,
    onHistoryClicked: React.PropTypes.func,
    onUpvoteClicked: React.PropTypes.func.isRequired,
    onCancelUpvoteClicked: React.PropTypes.func.isRequired,
    onUserHeaderClicked: React.PropTypes.func.isRequired,

    target: React.PropTypes.object,
    showEditForm: React.PropTypes.bool.isRequired,
    showReplyForm: React.PropTypes.bool.isRequired
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  componentWillUnmount: function() {
    this.props.onComponentWillUnmount()
  },

  render: function() {
    const posts = this.props.loaded
      ? (<PostShowListController
        urlPostId={parseInt(this.props.postId)}
        hideActions={!this.props.userSignedIn}
        onReplyClicked={this.props.onReplyClicked}
        onEditClicked={this.props.onEditClicked}
        onReportClicked={this.props.onReportClicked}
        onShareClicked={this.props.onShareClicked}
        onHistoryClicked={this.props.onHistoryClicked}
        onUpvoteClicked={this.props.onUpvoteClicked}
        onCancelUpvoteClicked={this.props.onCancelUpvoteClicked}
        onUserHeaderClicked={this.props.onUserHeaderClicked}
      />)
      : (<CircularProgress />)
    const composeReplyContent = this.props.showEditForm || this.props.showReplyForm
      ? (<ComposeReplyCard
        target={this.props.target}
        showEditForm={this.props.showEditForm}
        showReplyForm={this.props.showReplyForm}
      />)
      : null

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            {posts}
            {
              this.props.userSignedIn
                ? composeReplyContent
                : <SignInFirstCardController location={this.props.location} promptText="You have to log in first to write a reply." />
            }
          </div>
        </div>
      </div>
    )
  }
})

export default PostShow
