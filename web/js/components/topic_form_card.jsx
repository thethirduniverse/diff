import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'

import TopicFormController from 'controllers/topic_form_controller.js'

const TopicFormCard = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <Card>
          <CardTitle
            title = "Write a new topic"
          />
          <CardText>
            <TopicFormController />
          </CardText>
        </Card>
      </div>
    )
  }
})

export default TopicFormCard
