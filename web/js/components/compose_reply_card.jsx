import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { truncatedContent } from 'helpers/post_helper.js'
import PostFormController from 'controllers/post_form_controller.js'
import EditFormController from 'controllers/edit_form_controller'
import { PostFormActionTypes as actionTypes } from 'reducers/post_form_reducer.js'

const ComposeReplyCard = React.createClass({
  propTypes: {
    target: React.PropTypes.object,
    actionType: React.PropTypes.string,
    showEditForm: React.PropTypes.bool.isRequired
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
    const {actionType, showEditForm} = this.props
    console.log('showEditForm:' + showEditForm)
    return (
      <Card>
        <CardHeader
          title = {this.getTitle()}
        />
        <CardText>
          {
            actionType !== actionTypes.none
            ? <PostFormController />
            : null
          }
          {
            showEditForm ? <EditFormController /> : null
          }
        </CardText>
      </Card>
    )
  }
})

export default ComposeReplyCard
