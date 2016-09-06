var React = require('react')
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../helpers/redux_form_helpers.jsx'

var SignUpBox = React.createClass({
  propTypes: {
    signUpClicked: React.PropTypes.func.isRequired,
    haveAccountClicked: React.PropTypes.func.isRequired
  },

  signUpClicked: function(data) {
    this.props.signUpClicked(data)
  },

  haveAccountClicked: function() {
    this.props.haveAccountClicked()
  },

  render: function() {
    return (
      <Card>
        {/* eslint-disable react/prop-types */}
        <form onSubmit={this.props.handleSubmit(this.signUpClicked)}>
        {/* eslint-enable react/prop-types */}
          <CardHeader title="Sign Up" />
          <CardText>
            <Field name="email" label="Email" type="email" fullWidth={true} component={renderTextField} />
            <Field name="password" label="Password" type="password" fullWidth={true} component={renderTextField} />
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

module.exports = reduxForm({
  form: 'sign-up'
})(SignUpBox)
