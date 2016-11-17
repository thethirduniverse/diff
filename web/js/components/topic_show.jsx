import CircularProgress from 'material-ui/CircularProgress'
import React from 'react'

import NoReplyCard from 'components/no_reply_card.jsx'
import PaginationDots from 'components/pagination_dots.jsx'
import ReplyList from 'components/reply_list.jsx'
import SignInFirstCardController from 'controllers/sign_in_first_card_controller.js'
import TopicCard from 'components/topic_card.jsx'

const TopicShow = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    topicID: React.PropTypes.string.isRequired,
    topic: React.PropTypes.object,

    userSignedIn: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,

    location: React.PropTypes.string.isRequired
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    const topicCardContent = this.props.topic
      ? (<TopicCard topic={this.props.topic} hideActions={!this.props.userSignedIn}/>)
      : (<CircularProgress />)
    const repliesContent = this.props.topic
      ? (<ReplyList replies={this.props.topic.replies} />)
      : null

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        {topicCardContent}
        {repliesContent}
        {
          this.props.userSignedIn
            ? <NoReplyCard topicID={this.props.topicID}/>
            : <SignInFirstCardController location={this.props.location} promptText="You have to log in first to write a reply." />
        }
        <PaginationDots totalDots={5} currentIndex={0} />
      </div>
    )
  }
})

export default TopicShow
