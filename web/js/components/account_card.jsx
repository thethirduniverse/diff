var React = require('react')
var SignInCard = require('./sign_in.jsx')
var SignUpCard = require('./sign_up.jsx')

var AccountCard = React.createClass({
  propTypes: {
    haveAccountClicked: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired,
    visible: React.PropTypes.string.isRequired
  },

  signInClicked: function() {
    console.info('sign in clicked')
  },

  notHaveAccountClicked: function() {
    console.info('not have account clicked')
    this.props.notHaveAccountClicked()
  },

  signUpClicked: function() {
    console.info('sign up clicked')
  },

  haveAccountClicked: function() {
    console.info('have account clicked')
    this.props.haveAccountClicked()
  },

  render: function() {
    var content = this.props.visible === 'sign-in'
      ? <SignInCard signInClicked={this.signInClicked} notHaveAccountClicked={this.notHaveAccountClicked}/>
      : <SignUpCard signUpClicked={this.signUpClicked} haveAccountClicked={this.haveAccountClicked}/>

    return (
      <div className="card">
        <div className="card-content">
          {content}
        </div>
      </div>
    )
  }
})

module.exports = AccountCard
