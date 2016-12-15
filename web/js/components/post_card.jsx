import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'

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
    onReportClicked: React.PropTypes.func,

    presentAsReply: React.PropTypes.bool
  },

  handleCardClick: function(id) {
    this.props.onCardClick(id)
  },

  render: function() {
    const { post, presentAsReply } = this.props
    const clickHandler = this.props.cardClickEnabled
      ? this.handleCardClick.bind(this, this.props.post.id)
      : null
    const headerContent = presentAsReply
      ? null
      : (
        <h2>
        {/* eslint-disable react/prop-types */}
          <a href="javascript:void(0)" style={{...styles.title, color: this.props.muiTheme.palette.primary2Color}}>
        {/* eslint-enable react/prop-types */}
            {this.props.post.title}
          </a>
        </h2>
      )

    const actions = this.props.hideActions
      ? null
      : (
        <div>
          <FlatButton label="Reply" primary={true} onClick={this.props.onReplyClicked} />
          <FlatButton label="Report" secondary={true} onClick={this.props.onReportClicked} />
        </div>
      )

    const chipsContent = presentAsReply
      ? null
      : (
        <ChipList>
          <Chip style={styles.chip}>{this.props.post.view} views</Chip>
          {
            post.categories
              ? post.categories.map((c) => (
                <CategoryChip key={c.id} category={c} />
              ))
              : null
          }
        </ChipList>
      )

    return (
      <Card>
        <CardTitle onClick={clickHandler}>
          {headerContent}
        </CardTitle>
        <CardText style={styles.textBlock}>
          {this.props.post.content}
        </CardText>
        <CardActions>
          {chipsContent}
          {actions}
        </CardActions>
      </Card>
    )
  }
})

export default muiThemeable()(PostCard)
