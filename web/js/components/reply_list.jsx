import React from 'react'

import ReplyRow from 'components/reply_row.jsx'

const ReplyList = React.createClass({
  propTypes: {
    replyTree: React.PropTypes.array.isRequired,
    replyIndexes: React.PropTypes.array.isRequired,
    leftChevronClicked: React.PropTypes.func.isRequired,
    rightChevronClicked: React.PropTypes.func.isRequired,

    onReplyClicked: React.PropTypes.func.isRequired,
    onReportClicked: React.PropTypes.func.isRequired
  },

  render: function() {
    return (<div>
      {
        this.props.replyTree.map((replies, idx) => {
          const reply = replies[this.props.replyIndexes[idx]]

          return (<ReplyRow
            reply={reply}
            totalDots={replies.length}
            currentIndex={this.props.replyIndexes[idx]}
            showPaginationDots={replies.length > 1}
            key={reply.id}
            leftChevronClicked={this.props.leftChevronClicked.bind(null, idx)}
            rightChevronClicked={this.props.rightChevronClicked.bind(null, idx)}
            onReplyClicked={this.props.onReplyClicked.bind(null, reply)}
            onReportClicked={this.props.onReportClicked.bind(null, reply)}
          />)
        }
        )
      }
    </div>)
  }
})

export default ReplyList
