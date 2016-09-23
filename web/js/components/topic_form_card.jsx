import React from 'react'
import TopicFormController from '../controllers/topic_form_controller.js'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const TopicFormCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <Card>
        <CardHeader
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
