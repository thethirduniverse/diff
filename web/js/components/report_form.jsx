import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from 'helpers/redux_form_helpers.jsx'

var ReportForm = React.createClass({
  propTypes: {
    submitButtonLabel: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,

    secondaryButtonLabel: React.PropTypes.string,
    onSecondaryButtonClick: React.PropTypes.func.isRequired,

    errors: React.PropTypes.object
  },

  getDefaultProps: () => {
    return {
      submitButtonLabel: 'Submit Report',
      secondaryButtonLabel: 'Cancel',
      errors: {}
    }
  },

  render: function() {
    return (
      <form>
        <Field name="report[content]" label="Explanation" type="text" fullWidth={true} multiLine={true} errorText={this.props.errors.content} component={renderTextField} />

        <FlatButton label={this.props.secondaryButtonLabel} secondary={true} onClick={this.props.onSecondaryButtonClick} />
       {/* eslint-disable react/prop-types */}
       <RaisedButton label={this.props.submitButtonLabel} primary={true} style={{margin: 12}} onClick={this.props.handleSubmit(this.props.onSubmit)}/>
       {/* eslint-enable react/prop-types */}
     </form>
    )
  }
})

export default reduxForm({
  form: 'report-form'
})(ReportForm)
