var React = require('react')
var SignInCard = require('./sign_in.jsx')
var SignUpCard = require('./sign_up.jsx')

var AccountCard = React.createClass({
  signInClicked: function() {
    console.info('sign in clicked')
  },

  notHaveAccountClicked: function() {
    console.info('not have account clicked')
    this.setState({visible: 'sign-up'})
  },

  signUpClicked: function() {
    console.info('sign up clicked')
  },

  haveAccountClicked: function() {
    console.info('have account clicked')
    this.setState({visible: 'sign-in'})
  },

  getInitialState: function() {
    return {visible: 'sign-in'}
  },

  render: function() {
    var content = this.state.visible === 'sign-in'
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
