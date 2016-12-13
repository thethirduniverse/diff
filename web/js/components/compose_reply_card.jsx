import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import PostFormController, { ActionTypes } from 'controllers/post_form_controller.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    topic: React.PropTypes.object,
    reply: React.PropTypes.object
  },

  getTitle: function() {
    const topic = this.props.topic
    const reply = this.props.reply
    if (topic) {
      return 'Replying to topic: ' + topic.title
    } else if (reply) {
      return 'Replying to reply: ' + reply.content
    }
    return 'Replying to unknown entity'
  },

  render: function() {
    const topicID = this.props.topic ? this.props.topic.id : null
    const replyID = this.props.reply ? this.props.reply.id : null
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          Be the first to write a reply.
          <PostFormController
            parentPostId={topicID || replyID}
            action={ActionTypes.insert}
          />
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
