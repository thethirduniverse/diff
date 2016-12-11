import React from 'react'

import ReplyRow from 'components/reply_row.jsx'

const ReplyList = React.createClass({
  propTypes: {
    replyTree: React.PropTypes.array.isRequired,
    replyIndexes: React.PropTypes.array.isRequired,
    leftChevronClicked: React.PropTypes.func.isRequired,
    rightChevronClicked: React.PropTypes.func.isRequired,
    paginationDotClicked: React.PropTypes.func.isRequired,

    shouldShowExpandMore: React.PropTypes.func.isRequired,
    expandMoreClicked: React.PropTypes.func.isRequired,

    hideActions: React.PropTypes.bool.isRequired,
    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func
  },

  paginationDotClicked: function(level) {
    const that = this
    return function(idx) {
      that.props.paginationDotClicked(level, idx)
    }
  },

  expandMoreClicked: function(level) {
    const that = this
    return function(idx) {
      that.props.expandMoreClicked(level, idx)
    }
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
            expandMoreClicked={this.expandMoreClicked(idx)}
            showExpandMore={this.props.shouldShowExpandMore(reply)}
            paginationDotClicked={this.paginationDotClicked(idx)}
            hideActions={this.props.hideActions}
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
