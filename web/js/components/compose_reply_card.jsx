import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { truncatedContent } from 'helpers/post_helper.js'
import EditFormController from 'controllers/edit_form_controller'
import ReplyFormController from 'controllers/reply_form_controller'
import { PostFormActionTypes as actionTypes } from 'reducers/post_form_reducer.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object,
    actionType: React.PropTypes.string,
    showEditForm: React.PropTypes.bool.isRequired,
    showReplyForm: React.PropTypes.bool.isRequired
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
    const {showEditForm, showReplyForm} = this.props
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          {
            showEditForm ? <EditFormController /> : null
          }
          {
            showReplyForm ? <ReplyFormController /> : null
          }
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
