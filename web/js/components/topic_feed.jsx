import React from 'react'

import TopicCard from 'components/topic_card.jsx'

const TopicFeed = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired,

    /* Invoked when one of the cards in feed is clicked
     */
    onCardClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (<div>
      {
        this.props.topics.map((topic) => (
          <TopicCard
            topic={topic}
            key={topic.id}

            cardClickEnabled={true}
            onCardClick={this.props.onCardClick}

            hideActions={true}
          />
        ))
      }
    </div>)
  }
})

export default TopicFeed
