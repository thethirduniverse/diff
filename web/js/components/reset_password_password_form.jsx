import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from 'helpers/redux_form_helpers.jsx'

var ResetPasswordPasswordForm = React.createClass({
  propTypes: {
    submitClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,

    showBadTokenDialog: React.PropTypes.bool.isRequired,
    dismissDialog: React.PropTypes.func.isRequired,
    resetPassword: React.PropTypes.func.isRequired
  },

  render: function() {
    const passwordError = this.props.errors ? this.props.errors['password'] : null
    const confirmationError = this.props.errors ? this.props.errors['password_confirmation'] : null

    return (
      <Card>
        {/* eslint-disable react/prop-types */}
        <form onSubmit={this.props.handleSubmit(this.props.submitClicked)}>
        {/* eslint-enable react/prop-types */}
          <CardHeader title="New Password" />
          <CardText>
            <Field name="user[password]" label="Password" type="password" fullWidth={true} errorText={passwordError} component={renderTextField} />
            <Field name="user[password_confirmation]" label="Password Confirmation" type="password" fullWidth={true} errorText={confirmationError} component={renderTextField} />
          </CardText>
          <CardActions>
            <RaisedButton label="Submit" primary={true} style={{margin: 12}} type="submit" />
          </CardActions>
        </form>
        <Dialog
          title="Something is wrong with your token"
          actions={[
            <FlatButton
              label="Cancel"
              onClick={this.props.dismissDialog}
            />,
            <FlatButton
              label="Reset Again"
              primary={true}
              onClick={this.props.resetPassword}
            />
          ]}
          modal={false}
          open={this.props.showBadTokenDialog}
          onRequestClose={this.props.dismissDialog}
        >
          Sorry! Something is wrong with your token. Did you reset your password multiple times and not resetting through the last link we sent you? You can try resetting your password again.
        </Dialog>
      </Card>
    )
  }
})

export default reduxForm({
  form: 'account-reset-password-password'
})(ResetPasswordPasswordForm)
