import React from 'react'
import TopicFeedController from '../controllers/topic_feed_controller.js'

const Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <h1>Home Page</h1>
        <TopicFeedController />
    </div>
    )
  }
})

export default Home
