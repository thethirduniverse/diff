import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const NoReplyCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = "This topic has no reply yet."
        />
        <CardText>
          Be the first to write a reply.
        </CardText>
      </Card>
    )
  }
})

export default NoReplyCard
