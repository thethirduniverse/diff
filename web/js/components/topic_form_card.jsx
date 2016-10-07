import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import TopicFormController from 'controllers/topic_form_controller.js'

const TopicFormCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardTitle
          title = "Write a new topic"
        />
        <CardText>
          <TopicFormController />
        </CardText>
      </Card>
    )
  }
})

export default TopicFormCard
