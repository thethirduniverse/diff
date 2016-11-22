import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import ReplyFormController from 'controllers/reply_form_controller.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    topic: React.PropTypes.object,
    reply: React.PropTypes.object
  },

  getTitle: function() {
    const topic = this.props.topic
    if (topic) {
      return 'Replying to topic: ' + topic.title
    }
    return 'Replying to unknown entity'
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          Be the first to write a reply.
          <ReplyFormController topicID={this.props.topic.id}/>
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
