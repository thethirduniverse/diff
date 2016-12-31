import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card'
import styles from '~/styles'

import { nameOfUser } from 'helpers/user_helper'

const EditCard = React.createClass({
  propTypes: {
    edit: React.PropTypes.object.isRequired
  },

  render: function() {
    const { edit } = this.props
    const { user } = edit

    return (
      <Card>
        <CardHeader
          title={nameOfUser(user)}
          />
        <CardTitle
          title={edit.message}
          subtitle={'version: ' + (edit.version + 1)}
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
