import React from 'react'

import PaginationDots from 'components/pagination_dots.jsx'
import ReplyCard from 'components/reply_card.jsx'

const ReplyRow = React.createClass({
  propTypes: {
    reply: React.PropTypes.object.isRequired,
    totalDots: React.PropTypes.number.isRequired,
    currentIndex: React.PropTypes.number.isRequired,
    leftChevronClicked: React.PropTypes.func.isRequired,
    rightChevronClicked: React.PropTypes.func.isRequired
  },

  showPaginationDots: function() {
    return this.props.totalDots > 1
  },

  render: function() {
    return (
      <div>
        <ReplyCard
          reply={this.props.reply}
        />
        {
          this.showPaginationDots()
            ? <PaginationDots
              totalDots={this.props.totalDots}
              currentIndex={this.props.currentIndex}
              leftChevronClicked={this.props.leftChevronClicked}
              rightChevronClicked={this.props.rightChevronClicked}
            />
            : null
        }
      </div>
    )
  }
})

export default ReplyRow