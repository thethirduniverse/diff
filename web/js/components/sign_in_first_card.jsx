import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardTitle, CardActions } from 'material-ui/Card'

const SignInFirstCard = React.createClass({
  propTypes: {
    loginClicked: React.PropTypes.func.isRequired,
    promptText: React.PropTypes.string
  },

  render: function() {
    return (
      <Card>
        <CardTitle>
          {this.props.promptText}
        </CardTitle>
        <CardActions>
          <FlatButton label="Log In" onClick={this.props.loginClicked} />
        </CardActions>
      </Card>
    )
  }
})

export default SignInFirstCard
