import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import CategoryChip from './category_chip.jsx'
import ChipList from './chip_list.jsx'
import Chip from 'material-ui/Chip'
import styles from '../styles.js'

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
      <CategoryChip key={c.id} category={c} />
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
        <CardActions>
          <ChipList>
            <Chip style={styles.chip}>{this.props.topic.view} views</Chip>
            {categoryChips}
          </ChipList>
          {actions}
        </CardActions>
      </Card>
    )
  }
})

export default TopicCard
