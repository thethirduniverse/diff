import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import ReplyFormController from 'controllers/reply_form_controller.js'

const NoReplyCard = React.createClass({
  propTypes: {
    topicID: React.PropTypes.string
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = "This topic has no reply yet."
        />
        <CardText>
          Be the first to write a reply.
          <ReplyFormController topicID={this.props.topicID}/>
        </CardText>
      </Card>
    )
  }
})

export default NoReplyCard
