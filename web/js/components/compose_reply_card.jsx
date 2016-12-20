import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import PostFormController from 'controllers/post_form_controller.js'
import { PostFormActionTypes as actionTypes } from 'reducers/post_form_reducer.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object,
    actionType: React.PropTypes.string
  },

  getTitle: function() {
    const {target, actionType: type} = this.props
    switch (type) {
      case actionTypes.reply:
        return 'Replying to post:' + target.content
      case actionTypes.edit:
        return 'Editing to post:' + target.content
      default:
        return ''
    }
  },

  render: function() {
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          <PostFormController />
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
