import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'

// Example style from http://www.material-ui.com/#/components/chip
const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

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
    const categoryChips = this.props.topic.categories.map((c) => (
      <Chip key={c.id} style={styles.chip}>{c.name}</Chip>
    ))

    return (
      <Card>
        <CardTitle
          title = {this.props.topic.title}
          onClick = {clickHandler}
        />
        <CardText
          onClick = {clickHandler} >
          {this.props.topic.content}
        </CardText>
        <CardActions style={styles.wrapper}>
          {actions}
          <Chip style={styles.chip}>{this.props.topic.view} views</Chip>
          {categoryChips}
        </CardActions>
      </Card>
    )
  }
})

export default TopicCard
