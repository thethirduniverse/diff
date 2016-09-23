import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'

const TopicCard = React.createClass({
  propTypes: {
    topic: React.PropTypes.object.isRequired,

    /* If true, the onCardClick callback will be called when user
     * tap on card header and text
     */
    cardClickEnabled: React.PropTypes.bool,
    onCardClick: React.PropTypes.func,

    hideActions: React.PropTypes.bool
  },

  handleCardClick: function(id) {
    this.props.onCardClick(id)
  },

  render: function() {
    const clickHandler = this.props.cardClickEnabled
      ? this.handleCardClick.bind(this, this.props.topic.id)
      : null
    const actions = this.props.hideActions
      ? null
      : (
        <div>
          <FlatButton label="Reply" />
          <FlatButton label="Report" />
        </div>
      )

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
          <Chip>{this.props.topic.view} views</Chip>
          {actions}
        </CardActions>
      </Card>
    )
  }
})

export default TopicCard
