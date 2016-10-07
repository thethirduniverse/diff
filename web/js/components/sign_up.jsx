import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import { renderTextField } from 'helpers/redux_form_helpers.jsx'

var SignUpBox = React.createClass({
  propTypes: {
    signUpClicked: React.PropTypes.func.isRequired,
    haveAccountClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  signUpClicked: function(data) {
    this.props.signUpClicked(data)
  },

  haveAccountClicked: function() {
    this.props.haveAccountClicked()
  },

  render: function() {
    const emailError = this.props.errors ? this.props.errors['email'] : null
    const passwordError = this.props.errors ? this.props.errors['password'] : null
    const confirmationError = this.props.errors ? this.props.errors['password_confirmation'] : null

    return (
      <Card>
        {/* eslint-disable react/prop-types */}
        <form onSubmit={this.props.handleSubmit(this.signUpClicked)}>
        {/* eslint-enable react/prop-types */}
          <CardHeader title="Sign Up" />
          <CardText>
            <Field name="email" label="Email" type="email" fullWidth={true} errorText={emailError} component={renderTextField} />
            <Field name="password" label="Password" type="password" fullWidth={true} errorText={passwordError} component={renderTextField} />
            <Field name="password_confirmation" label="Password Confirmation" type="password" fullWidth={true} errorText={confirmationError} component={renderTextField} />
          </CardText>
          <CardActions>
            <RaisedButton label="Sign Up" primary={true} style={{margin: 12}} type="submit" />
            <FlatButton label="Already have an account?" secondary={true} onClick={this.haveAccountClicked} />
          </CardActions>
        </form>
      </Card>
    )
  }
})

export default reduxForm({
  form: 'sign-up'
})(SignUpBox)
