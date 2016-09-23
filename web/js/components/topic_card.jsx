import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const TopicCard = React.createClass({
  propTypes: {
    topic: React.PropTypes.object.isRequired,

    /* If true, the onCardClick callback will be called when user
     * tap on card header and text
     */
    cardClickEnabled: React.PropTypes.bool,
    onCardClick: React.PropTypes.func
  },

  handleCardClick: function(id) {
    this.props.onCardClick(id)
  },

  render: function() {
    const clickHandler = this.props.cardClickEnabled
      ? this.handleCardClick.bind(this, this.props.topic.id)
      : null
    return (
      <Card>
        <CardHeader
          title = {this.props.topic.title}
          onClick = {clickHandler}
        />
        <CardText
          onClick = {clickHandler} >
          {this.props.topic.content}
        </CardText>
        <CardActions>
          <FlatButton label="Reply" />
          <FlatButton label="Report" />
        </CardActions>
      </Card>
    )
  }
})

export default TopicCard
