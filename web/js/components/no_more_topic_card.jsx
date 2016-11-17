import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const NoMoreTopicCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = "No more topics"
        />
        <CardText>
          Sorry, this is all the topics we've got.
        </CardText>
      </Card>
    )
  }
})

export default NoMoreTopicCard
