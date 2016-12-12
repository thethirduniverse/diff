import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'

import CategoryChip from 'components/category_chip.jsx'
import ChipList from 'components/chip_list.jsx'
import styles from '~/styles.js'

const PostCard = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,

    /* If true, the onCardClick callback will be called when user
     * tap on card header and text
     */
    cardClickEnabled: React.PropTypes.bool,
    onCardClick: React.PropTypes.func,

    hideActions: React.PropTypes.bool,

    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func
  },

  handleCardClick: function(id) {
    this.props.onCardClick(id)
  },

  render: function() {
    const clickHandler = this.props.cardClickEnabled
      ? this.handleCardClick.bind(this, this.props.post.id)
      : null
    const actions = this.props.hideActions
      ? null
      : (
        <div>
          <FlatButton label="Reply" onClick={this.props.onReplyClicked} />
          <FlatButton label="Report" onClick={this.props.onReportClicked} />
        </div>
      )
    const categoryChips = this.props.post.categories.map((c) => (
      <CategoryChip key={c.id} category={c} />
    ))

    return (
      <Card>
        <CardTitle onClick={clickHandler}>
          <h2>
            <a href="javascript:void(0)">
              {this.props.post.title}
            </a>
          </h2>
        </CardTitle>
        <CardText style={styles.textBlock}>
          {this.props.post.content}
        </CardText>
        <CardActions>
          <ChipList>
            <Chip style={styles.chip}>{this.props.post.view} views</Chip>
            {categoryChips}
          </ChipList>
          {actions}
        </CardActions>
      </Card>
    )
  }
})

export default PostCard
