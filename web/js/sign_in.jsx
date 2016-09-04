var React = require('react')

var SignInBox = React.createClass({
  render: function() {
    return (
      <div className="card">
        <form>
          <div className="card-content">
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
          </div>
          <div className="card-action">
            <button className="btn" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = SignInBox
