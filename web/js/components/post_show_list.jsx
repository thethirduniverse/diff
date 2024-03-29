import React from 'react'

import PostShowListRow from 'components/post_show_list_row.jsx'

const PostShowList = React.createClass({
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
    onEditClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,
    onHistoryClicked: React.PropTypes.func,
    onUpvoteClicked: React.PropTypes.func.isRequired,
    onCancelUpvoteClicked: React.PropTypes.func.isRequired,
    onUserHeaderClicked: React.PropTypes.func.isRequired,

    requestPostLoad: React.PropTypes.func.isRequired,
    cancelPostLoad: React.PropTypes.func.isRequired,

    urlPostId: React.PropTypes.number.isRequired
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

          return (<PostShowListRow
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
            onEditClicked={this.props.onEditClicked.bind(null, reply)}
            onReportClicked={this.props.onReportClicked.bind(null, reply)}
            onShareClicked={this.props.onShareClicked.bind(null, reply)}
            onHistoryClicked={this.props.onHistoryClicked.bind(null, reply)}
            onUpvoteClicked={this.props.onUpvoteClicked.bind(null, reply)}
            onCancelUpvoteClicked={this.props.onCancelUpvoteClicked.bind(null, reply)}
            onUserHeaderClicked={this.props.onUserHeaderClicked.bind(null, reply.last_edit ? reply.last_edit.user : null)}
            presentAsReply={idx !== 0}
            requestPostLoad={this.props.requestPostLoad}
            cancelPostLoad={this.props.cancelPostLoad}
            highlighted={this.props.urlPostId === reply.id && idx !== 0}
          />)
        }
        )
      }
    </div>)
  }
})

export default PostShowList
