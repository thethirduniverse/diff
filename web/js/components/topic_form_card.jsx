import React from 'react'
import TopicFormController from '../controllers/topic_form_controller.js'
import { Card, CardTitle, CardText } from 'material-ui/Card'

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
