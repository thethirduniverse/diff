import React from 'react'

import TopicCard from 'components/topic_card.jsx'
import NoMoreTopicCard from 'components/no_more_topic_card.jsx'
import HasMoreTopicCard from 'components/has_more_topic_card.jsx'

const TopicFeed = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired,
    has_more: React.PropTypes.bool.isRequired,

    /* Invoked when one of the cards in feed is clicked
     */
    onCardClick: React.PropTypes.func.isRequired,
    loadMore: React.PropTypes.func.isRequired
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
      {
        this.props.has_more
          ? <HasMoreTopicCard onLoadMoreClicked={this.props.loadMore} />
          : <NoMoreTopicCard />
      }
    </div>)
  }
})

export default TopicFeed
