import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { truncatedContent } from 'helpers/post_helper.js'
import EditFormController from 'controllers/edit_form_controller'
import ReplyFormController from 'controllers/reply_form_controller'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object,
    showEditForm: React.PropTypes.bool.isRequired,
    showReplyForm: React.PropTypes.bool.isRequired
  },

  getTitle: function() {
    const {target, showEditForm, showReplyForm} = this.props
    if (showReplyForm) {
      return 'Replying post: ' + truncatedContent(target.content, 100)
    } else if (showEditForm) {
      return 'Replying post: ' + truncatedContent(target.content, 100)
    }
    return ''
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
