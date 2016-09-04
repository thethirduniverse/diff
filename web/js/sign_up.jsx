var React = require('react')

var SignUpBox = React.createClass({
  render: function() {
    return (
      <div className="card">
        <form>
          <div className="card-content">
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
          </div>
          <div className="card-action">
            <button className="btn" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = SignUpBox
