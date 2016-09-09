import React from 'react'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../helpers/redux_form_helpers.jsx'

var SignInBox = React.createClass({
  propTypes: {
    signInClicked: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired
  },

  signInClicked: function(data) {
    this.props.signInClicked(data)
  },

  notHaveAccountClicked: function() {
    this.props.notHaveAccountClicked()
  },

  render: function() {
    return (
      <Card>
        {/* eslint-disable react/prop-types */}
        <form onSubmit={this.props.handleSubmit(this.signInClicked)}>
        {/* eslint-enable react/prop-types */}
          <CardHeader title="Sign In" />
          <CardText>
            <Field name="email" label="Email" type="email" fullWidth={true} component={renderTextField} />
            <Field name="password" label="Password" type="password" fullWidth={true} component={renderTextField} />
          </CardText>
          <CardActions>
            <RaisedButton label="Sign In" primary={true} style={{margin: 12}} type="submit" />
            <FlatButton label="Doesn't have an account yet?" secondary={true} onClick={this.notHaveAccountClicked} />
          </CardActions>
        </form>
      </Card>
    )
  }
})

export default reduxForm({
  form: 'sign-in'
})(SignInBox)
