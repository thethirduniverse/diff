import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card'

import styles from '~/styles'
import { nameOfUser } from 'helpers/user_helper'

const EditCard = React.createClass({
  propTypes: {
    edit: React.PropTypes.object.isRequired,
    onHeaderClicked: React.PropTypes.func.isRequired
  },

  subtitleMessage: (edit) => {
    const version = 'version: ' + (edit.version + 1)
    const time = 'created at: ' + edit.created_at
    return version + ' ' + time
  },

  render: function() {
    const { edit, onHeaderClicked } = this.props
    const { user } = edit

    return (
      <Card>
        <CardHeader
          title={nameOfUser(user)}
          subtitle={user.bio}
          avatar={user.avatar}
          onClick={onHeaderClicked}
          style={styles.clickable}
          />
        <CardTitle
          title={edit.message}
          subtitle={this.subtitleMessage(edit)}
          />
        <CardText style={styles.textBlock}>
          {edit.patch}
        </CardText>
        <CardActions>
          <FlatButton label="action" />
        </CardActions>
      </Card>
    )
  }
})

export default EditCard
