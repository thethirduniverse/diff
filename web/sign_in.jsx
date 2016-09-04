var React = require('react');

var SignInBox = React.createClass({
  render: function() {
    return (
      <div className="sign_in_box">
        Email<br/>
        <input type="text" name="sign_in_email" /><br/>
        Password<br/>
        <input type="password" name="sign_in_password" /><br/>
        </div>
    );
  }
});

module.exports = SignInBox;
