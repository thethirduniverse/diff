import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../helpers/redux_form_helpers.jsx'

var TopicForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    submitButtonLabel: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    secondaryButtonLabel: React.PropTypes.string.isRequired,
    onSecondaryButtonClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      /* eslint-disable react/prop-types */
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        {/* eslint-enable react/prop-types */}
        <Field name="title" label="Title" type="text" fullWidth={true} component={renderTextField} />
        <Field name="content" label="Content" type="text" fullWidth={true} multiLine={true} component={renderTextField} />
        <RaisedButton label={this.props.submitButtonLabel} primary={true} style={{margin: 12}} type="submit" />
        <FlatButton label={this.props.secondaryButtonLabel} secondary={true} onClick={this.props.onSecondaryButtonClick} />
      </form>
    )
  }
})

export default reduxForm({
  form: 'topic-form'
})(TopicForm)
