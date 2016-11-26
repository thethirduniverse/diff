import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardActions, CardText } from 'material-ui/Card'

import styles from '~/styles.js'

const ReplyCard = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired,

    onReplyClicked: React.PropTypes.func.isRequired,
    onReportClicked: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardText style={styles.textBlock}>
          {this.props.reply.content}
        </CardText>
        <CardActions>
          <RaisedButton label="Reply" primary={true} onClick={this.props.onReplyClicked}/>
          <RaisedButton label="Report" onClick={this.props.onReportClicked}/>
        </CardActions>
      </Card>
    )
  }
})

export default ReplyCard
