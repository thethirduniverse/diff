import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'

import ResetPasswordEmailCard from 'components/reset_password_email_form.jsx'

const ResetPasswordCard = React.createClass({
  propTypes: {
    email: React.PropTypes.string,
    navigateToRoot: React.PropTypes.func.isRequired,
    resetClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  promptContent: function() {
    return (
      <Card>
        <CardHeader title="Reset Password Instructions Sent" />
        <CardText>
          We've sent an email to {this.props.email}. Please check the email for instructions on how to reset your password.
        </CardText>
        <CardActions>
          <RaisedButton label="Go to homepage" primary={true} style={{margin: 12}} onClick={this.props.navigateToRoot} />
        </CardActions>
      </Card>
    )
  },

  render: function() {
    return this.props.email
      ? this.promptContent()
      : <ResetPasswordEmailCard
        email={this.props.email}
        resetClicked={this.props.resetClicked}
        errors={this.props.errors}
      />
  }
})

export default ResetPasswordCard
