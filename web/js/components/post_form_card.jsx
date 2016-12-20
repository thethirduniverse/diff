import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import PostFormController from 'controllers/post_form_controller.js'

const PostFormCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardTitle
          title = "Write a new topic"
        />
        <CardText>
          <PostFormController />
        </CardText>
      </Card>
    )
  }
})

export default PostFormCard
