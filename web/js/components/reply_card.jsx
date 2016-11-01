import React from 'react'
import { Card, CardActions, CardText } from 'material-ui/Card'

const ReplyCard = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardText>
          {this.props.reply.content}
        </CardText>
        <CardActions>
        </CardActions>
      </Card>
    )
  }
})

export default ReplyCard
