import CircularProgress from 'material-ui/CircularProgress'
import React from 'react'
import { Card, CardText } from 'material-ui/Card'

const PostLoadingCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardText>
          <CircularProgress />
          Loading post...
        </CardText>
      </Card>
    )
  }
})

export default PostLoadingCard
