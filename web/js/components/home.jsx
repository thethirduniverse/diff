import React from 'react'
import TopicFeedController from '../controllers/topic_feed_controller.js'

const Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <h1>Home Page</h1>
        <TopicFeedController />
      </div>
    )
  }
})

export default Home
