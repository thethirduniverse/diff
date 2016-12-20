import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import PostFormController from 'controllers/post_form_controller.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object
  },

  getTitle: function() {
    const target = this.props.target
    return 'Replying to post' + target.content
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          Be the first to write a reply.
          <PostFormController />
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
