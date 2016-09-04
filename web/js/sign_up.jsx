var React = require('react')

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
      <form>
        <legend>Sign Up</legend>
        <div className="row">
          <div className="input-field col s12">
            <input type="text" id="sign_up_email_field" name="sign_up_email" /><br/>
            <label htmlFor="sign_up_email_field">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="password" id="sign_up_password_field" name="sign_up_password" /><br/>
            <label htmlFor="sign_up_password_field">Password</label>
          </div>
        </div>
        <div className="card-action">
          <button className="btn" type="submit" onClick={this.signUpClicked}>Sign Up</button>
          <a className="right" onClick={this.haveAccountClicked}>Already have an account?</a>
        </div>
      </form>
    )
  }
})

module.exports = SignUpBox
