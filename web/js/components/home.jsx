import React from 'react'
import TopicFeed from './topic_feed.jsx'

const Home = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <h1>Home Page</h1>
        <TopicFeed topics={[
          {id: 1, title: 'AAA', content: 'aaaaaaaaaa'},
          {id: 2, title: 'BBB', content: 'bbbbbbbbbb'},
          {id: 3, title: 'CCC', content: 'cccccccccc'}
        ]}/>
    </div>
    )
  }
})

export default Home
