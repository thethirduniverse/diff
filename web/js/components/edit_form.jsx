import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import PostFormReviewDialog from 'components/post_form_review_dialog.jsx'
import { renderTextField } from 'helpers/redux_form_helpers.jsx'
import { truncatedContent } from 'helpers/post_helper.js'
import { editFormValidator as validate } from 'helpers/validators'

var EditForm = React.createClass({
  propTypes: {
    submitButtonLabel: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,

    secondaryButtonLabel: React.PropTypes.string,
    onSecondaryButtonClick: React.PropTypes.func,

    reviewing: React.PropTypes.bool.isRequired,
    reviewData: React.PropTypes.object,
    onConfirmReviewClicked: React.PropTypes.func.isRequired,
    onAbandonReviewClicked: React.PropTypes.func.isRequired,

    target: React.PropTypes.object,
    errors: React.PropTypes.object
  },

  getDefaultProps: () => {
    return {
      submitButtonLabel: 'Submit',
      secondaryButtonLabel: 'Revert Changes'
    }
  },

  getTitle: function() {
    const { target } = this.props
    return 'Editing post: ' + truncatedContent(target.content, 100)
  },

  getReviewDialog: function() {
    const { reviewing, reviewData, onConfirmReviewClicked, onAbandonReviewClicked } = this.props
    return <PostFormReviewDialog
    open={reviewing}
    oldData={reviewData ? reviewData.old.post : null}
    newData={reviewData ? reviewData.new.post : null}
    onConfirmClicked={onConfirmReviewClicked}
    onAbandonClicked={onAbandonReviewClicked}
    />
  },

  render: function() {
    return (
      <form>
        { this.getReviewDialog() }
        { this.getTitle() }
        <Field name="post[content]" label="Content" type="text" fullWidth={true} multiLine={true} errorText={this.props.errors.content} component={renderTextField} />
        <Field name="message" label="Edit Message" type="text" fullWidth={true} errorText={this.props.errors.message} component={renderTextField} />
        {/* eslint-disable react/prop-types */}
        <RaisedButton label={this.props.submitButtonLabel} primary={true} style={{margin: 12}} onClick={this.props.handleSubmit(this.props.onSubmit)}/>
        {/* eslint-enable react/prop-types */}
        <FlatButton label={this.props.secondaryButtonLabel} secondary={true} onClick={this.props.onSecondaryButtonClick} />
      </form>
    )
  }
})

export default reduxForm({
  form: 'edit-form',
  validate
})(EditForm)
