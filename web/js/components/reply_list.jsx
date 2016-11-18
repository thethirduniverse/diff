import React from 'react'

import ReplyCard from 'components/reply_card.jsx'

const ReplyList = React.createClass({
  propTypes: {
    replies: React.PropTypes.array.isRequired
  },

  render: function() {
    return (<div>
      {
        this.props.replies.map((reply) => (
          <ReplyCard
            reply={reply}
            key={reply.id}
          />
        ))
      }
    </div>)
  }
})

export default ReplyList
