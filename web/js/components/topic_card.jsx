import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const TopicCard = React.createClass({
  propTypes: {
    topic: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = {this.props.topic.title}
        />
        <CardText>{this.props.topic.content}</CardText>
        <CardActions>
          <FlatButton label="Reply" />
          <FlatButton label="Report" />
        </CardActions>
      </Card>
    )
  }
})

export default TopicCard
