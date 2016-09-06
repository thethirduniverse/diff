var React = require('react')
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

var SignInBox = React.createClass({
  propTypes: {
    signInClicked: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired
  },

  signInClicked: function(e) {
    e.preventDefault()
    this.props.signInClicked()
  },

  notHaveAccountClicked: function() {
    this.props.notHaveAccountClicked()
  },

  render: function() {
    return (
      <Card>
        <form>
          <CardHeader title="Sign In" />
          <CardText>
            <TextField floatingLabelText={"Email"} hintText={"Email"} type="text" fullWidth={true} />
            <TextField floatingLabelText={"Password"} hintText={"Password"} type="password" fullWidth={true} />
          </CardText>
          <CardActions>
            <RaisedButton label="Sign In" primary={true} style={{margin: 12}} onClick={this.signInClicked} />
            <FlatButton label="Doesn't have an account yet?" secondary={true} onClick={this.notHaveAccountClicked} />
          </CardActions>
        </form>
      </Card>
    )
  }
})

module.exports = SignInBox
