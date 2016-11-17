import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions } from 'material-ui/Card'

const HasMoreTopicCard = React.createClass({
  propTypes: {
    onLoadMoreClicked: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardActions>
          <FlatButton label="Load More" onClick={this.props.onLoadMoreClicked} />
        </CardActions>
      </Card>
    )
  }
})

export default HasMoreTopicCard
