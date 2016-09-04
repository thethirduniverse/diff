var React = require('react')

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
      <form>
        <legend>Sign In</legend>
        <div className="row">
          <div className="input-field col s12">
            <input type="text" id="sign_in_email_field" name="sign_in_email" /><br/>
            <label htmlFor="sign_in_email_field">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" id="sign_in_password_field" name="sign_in_password" /><br/>
            <label htmlFor="sign_in_password_field">Password</label>
          </div>
        </div>
        <div className="card-action">
          <button className="btn" type="submit" onClick={this.signInClicked}>Sign In</button>
          <a className="right" onClick={this.notHaveAccountClicked}>Doesn't have an account yet?</a>
        </div>
      </form>
    )
  }
})

module.exports = SignInBox
