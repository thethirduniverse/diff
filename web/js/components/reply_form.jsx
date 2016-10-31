import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from 'helpers/redux_form_helpers.jsx'

var ReplyForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  getDefaultProps: () => {
    return {
      submitButtonLabel: 'Submit'
    }
  },

  render: function() {
    return (
      <form>
        <Field name="reply[content]" label="Content" type="text" fullWidth={true} multiLine={true} errorText={this.props.errors.content} component={renderTextField} />

       {/* eslint-disable react/prop-types */}
       <RaisedButton label={this.props.submitButtonLabel} primary={true} style={{margin: 12}} disabled={this.props.pristine} onClick={this.props.handleSubmit(this.props.onSubmit)}/>
       {/* eslint-enable react/prop-types */}
     </form>
    )
  }
})

export default reduxForm({
  form: 'reply-form'
})(ReplyForm)
