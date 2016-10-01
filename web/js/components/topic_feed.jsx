import React from 'react'
import TopicCard from './topic_card.jsx'
import TopicFormCard from './topic_form_card.jsx'

const TopicFeed = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired,
    onComponentWillMount: React.PropTypes.func,

    /* Invoked when one of the cards in feed is clicked
     */
    onCardClick: React.PropTypes.func.isRequired
  },

  componentWillMount: function() {
    const f = this.props.onComponentWillMount
    if (f) {
      f();
    }
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
        <TopicFormCard />
    </div>)
  }
})

export default TopicFeed
