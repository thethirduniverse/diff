import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import PostFormController from 'controllers/post_form_controller.js'
import { PostFormActionTypes as actionTypes } from 'reducers/post_form_reducer.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object,
    actionType: React.PropTypes.string
  },

  getContentPreview: (target) => {
    const limit = 100
    if (target.content.length <= limit) {
      return target.content
    }
    return target.content.substring(0, limit - 3) + '...'
  },

  getTitle: function() {
    const {target, actionType: type} = this.props
    switch (type) {
      case actionTypes.reply:
        return 'Replying post: ' + this.getContentPreview(target)
      case actionTypes.edit:
        return 'Editing post: ' + this.getContentPreview(target)
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
