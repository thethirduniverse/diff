import Paper from 'material-ui/Paper'
import React from 'react'

import Styles from '~/styles.js'
import ReplyCard from 'components/reply_card.jsx'

const ReplyList = React.createClass({
  propTypes: {
    replies: React.PropTypes.array.isRequired
  },

  render: function() {
    return (<div>
      {
        this.props.replies.map((reply) => (
          <Paper zDepth={1} style={Styles.paperCard} key={reply.id}>
            <ReplyCard
              reply={reply}
            />
          </Paper>
        ))
      }
    </div>)
  }
})

export default ReplyList
