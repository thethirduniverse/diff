import React from 'react'
import TopicCard from './topic_card.jsx'

const TopicFeed = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired
  },

  render: function() {
    return (<div>
      {
        this.props.topics.map((topic) => (
          <TopicCard topic={topic} key={topic.id}/>
        ))
      }
    </div>)
  }
})

export default TopicFeed
