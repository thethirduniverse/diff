import React from 'react'

import PaginationDots from 'components/pagination_dots.jsx'
import ReplyCard from 'components/reply_card.jsx'

const ReplyRow = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired,
    totalDots: React.PropTypes.number.isRequired,
    currentIndex: React.PropTypes.number.isRequired,
    leftChevronClicked: React.PropTypes.func.isRequired,
    rightChevronClicked: React.PropTypes.func.isRequired,
    paginationDotClicked: React.PropTypes.func.isRequired,

    showExpandMore: React.PropTypes.bool.isRequired,
    expandMoreClicked: React.PropTypes.func.isRequired,

    hideActions: React.PropTypes.bool.isRequired,
    onReplyClicked: React.PropTypes.func,
    onReportClicked: React.PropTypes.func
  },

  showPaginationDots: function() {
    return this.props.totalDots > 1
  },

  expandMoreClicked: function() {
    this.props.expandMoreClicked(this.props.currentIndex)
  },

  render: function() {
    return (
      <div>
        <ReplyCard
          reply={this.props.reply}
          onReplyClicked={this.props.onReplyClicked}
          onReportClicked={this.props.onReportClicked}
          hideActions={this.props.hideActions}
        />
        {
          this.showPaginationDots()
            ? <PaginationDots
              totalDots={this.props.totalDots}
              currentIndex={this.props.currentIndex}
              leftChevronClicked={this.props.leftChevronClicked}
              rightChevronClicked={this.props.rightChevronClicked}
              paginationDotClicked={this.props.paginationDotClicked}
              expandMoreClicked={this.expandMoreClicked}
              showExpandMore={this.props.showExpandMore}
            />
            : null
        }
      </div>
    )
  }
})

export default ReplyRow
