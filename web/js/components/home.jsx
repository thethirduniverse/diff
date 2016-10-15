import React from 'react'

import NavigationListController from 'controllers/navigation_list_controller.js'
import TopicFeedController from 'controllers/topic_feed_controller.js'

const Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-2">
            <NavigationListController />
          </div>
          <div className="col-md-6 col-md-offset-1 col-sm-9 col-sm-offset-1">
            <TopicFeedController />
          </div>
        </div>
      </div>
    )
  }
})

export default Home
