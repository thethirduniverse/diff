import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardActions, CardText } from 'material-ui/Card'

import styles from '~/styles.js'

const ReplyCard = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardText style={styles.textBlock}>
          {this.props.reply.content}
        </CardText>
        <CardActions>
          <RaisedButton label="Reply" primary={true}/>
          <RaisedButton label="Report" />
        </CardActions>
      </Card>
    )
  }
})

export default ReplyCard
