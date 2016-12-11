import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardActions, CardText } from 'material-ui/Card'

import styles from '~/styles.js'

const ReplyCard = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired,

    hideActions: React.PropTypes.bool.isRequired,
    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func
  },

  render: function() {
    return (
      <Card>
        <CardText style={styles.textBlock}>
          {this.props.reply.content}
        </CardText>
        <CardActions>
          {
            this.props.hideActions
              ? null
              : <div>
                <RaisedButton label="Reply" primary={true} onClick={this.props.onReplyClicked}/>
                <RaisedButton label="Report" onClick={this.props.onReportClicked}/>
              </div>
          }
        </CardActions>
      </Card>
    )
  }
})

export default ReplyCard
