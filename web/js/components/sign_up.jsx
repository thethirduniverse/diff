var React = require('react')

import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

var SignUpBox = React.createClass({
  propTypes: {
    signUpClicked: React.PropTypes.func.isRequired,
    haveAccountClicked: React.PropTypes.func.isRequired
  },

  signUpClicked: function(e) {
    e.preventDefault()
    this.props.signUpClicked()
  },

  haveAccountClicked: function() {
    this.props.haveAccountClicked()
  },

  render: function() {
    return (
      <Card>
        <form>
          <CardHeader title="Sign Up" />
          <CardText>
            <TextField floatingLabelText={"Email"} hintText={"Email"} type="text" fullWidth={true} />
            <TextField floatingLabelText={"Password"} hintText={"Password"} type="password" fullWidth={true} />
          </CardText>
          <CardActions>
            <RaisedButton label="Sign Up" primary={true} style={{margin: 12}} onClick={this.signUpClicked} />
            <FlatButton label="Already have an account?" secondary={true} onClick={this.haveAccountClicked} />
          </CardActions>
        </form>
      </Card>
    )
  }
})

module.exports = SignUpBox
