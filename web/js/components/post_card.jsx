import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
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
    hideMenu: React.PropTypes.bool,

    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,

    presentAsReply: React.PropTypes.bool,
    highlighted: React.PropTypes.bool
  },

  handleCardClick: function(id) {
    this.props.onCardClick(id)
  },

  render: function() {
    const { post, presentAsReply, highlighted, hideMenu } = this.props
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

    const menu = hideMenu
      ? null
      : (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          style={{position: 'absolute', top: '12px', right: '12px'}}
        >
          <MenuItem primaryText="Write Refutation" onClick={this.props.onReplyClicked}/>
          <MenuItem primaryText="Share" onClick={this.props.onShareClicked}/>
        </IconMenu>
      )

    return (
      <Card>
        <CardTitle onClick={clickHandler} style={{position: 'relative'}}>
          {headerContent}
          {menu}
        </CardTitle>
        <CardText
          style={styles.textBlock}
          color={
            /* eslint-disable react/prop-types */
            highlighted
              ? this.props.muiTheme.palette.accent1Color
              : null
            /* eslint-enable react/prop-types */
          }>
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
