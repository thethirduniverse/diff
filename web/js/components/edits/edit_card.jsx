import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'

import styles from '~/styles'
import CardHeaderUser from '~/components/card/card_header_user.jsx'

const EditCard = React.createClass({
  propTypes: {
    edit: React.PropTypes.object.isRequired,
    onHeaderClicked: React.PropTypes.func.isRequired,
    onReportEditClicked: React.PropTypes.func.isRequired,
    hideActions: React.PropTypes.bool.isRequired
  },

  subtitleMessage: (edit) => {
    const version = 'version: ' + (edit.version + 1)
    const time = 'created at: ' + edit.created_at
    return version + ' ' + time
  },

  getActions: function() {
    const {onReportEditClicked, hideActions} = this.props
    if (hideActions) {
      return null
    }
    return <CardActions>
      <FlatButton
        label="Report Edit"
        onClick={onReportEditClicked}
        />
    </CardActions>
  },

  render: function() {
    const { edit, onHeaderClicked } = this.props
    const { user } = edit

    return (
      <Card>
        {
          CardHeaderUser(user, onHeaderClicked)
        }
        <CardTitle
          title={edit.message}
          subtitle={this.subtitleMessage(edit)}
          />
        <CardText style={styles.textBlock}>
          {edit.patch}
        </CardText>
        { this.getActions() }
      </Card>
    )
  }
})

export default EditCard
