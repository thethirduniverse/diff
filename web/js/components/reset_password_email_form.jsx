import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from 'helpers/redux_form_helpers.jsx'

const ResetPasswordEmailCard = React.createClass({
  propTypes: {
    email: React.PropTypes.string,
    resetClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function() {
    const emailError = this.props.errors ? this.props.errors.email : null

    return (
      <Card>
        {/* eslint-disable react/prop-types */}
        <form onSubmit={this.props.handleSubmit(this.props.resetClicked)}>
          {/* eslint-enable react/prop-types */}
          <CardHeader title="Reset Password" />
          <CardText>
            Please enter your email address.
            <Field name="email" label="Email" type="email" fullWidth={true} errorText={emailError} component={renderTextField} />
          </CardText>
          <CardActions>
            <RaisedButton label="Reset" primary={true} style={{margin: 12}} type="submit" />
          </CardActions>
        </form>
      </Card>
    )
  }
})

export default reduxForm({
  form: 'account-reset-password-email'
})(ResetPasswordEmailCard)
