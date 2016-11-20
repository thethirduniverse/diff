import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'

var ResetPasswordCheckEmailCard = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    navigateToRoot: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Card>
        <CardHeader title="Waiting For Email Confirmation" />
        <CardText>
          We've sent an email to {this.props.email}. Please follow the instruction in the email to finish your registration.
        </CardText>
        <CardActions>
          <RaisedButton label="Go to homepage" primary={true} style={{margin: 12}} onClick={this.props.navigateToRoot} />
        </CardActions>
      </Card>
    )
  }
})

export default ResetPasswordCheckEmailCard
