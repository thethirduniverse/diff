import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { truncatedContent } from 'helpers/post_helper.js'
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
        return 'Replying post: ' + truncatedContent(target.content, 100)
      case actionTypes.edit:
        return 'Editing post: ' + truncatedContent(target.content, 100)
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
