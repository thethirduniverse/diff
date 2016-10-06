import React from 'react'
import SignInCard from './sign_in.jsx'
import SignUpCard from './sign_up.jsx'
import EmailConfirmationCard from './email_confirmation_card.jsx'

const AccountCard = React.createClass({
  propTypes: {
    errors: React.PropTypes.object,
    haveAccountClicked: React.PropTypes.func.isRequired,
    navigateToRoot: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired,
    onComponentWillMount: React.PropTypes.func,
    signInClicked: React.PropTypes.func.isRequired,
    signUpClicked: React.PropTypes.func.isRequired,
    signUpEmail: React.PropTypes.string,
    visible: React.PropTypes.string.isRequired
  },

  signInClicked: function(data) {
    console.info('sign in clicked')
    this.props.signInClicked(data)
  },

  notHaveAccountClicked: function() {
    console.info('not have account clicked')
    this.props.notHaveAccountClicked()
  },

  signUpClicked: function(data) {
    console.info('sign up clicked')
    this.props.signUpClicked(data)
  },

  haveAccountClicked: function() {
    console.info('have account clicked')
    this.props.haveAccountClicked()
  },

  componentWillMount: function() {
    const f = this.props.onComponentWillMount
    if (f) {
      f()
    }
  },

  render: function() {
    switch (this.props.visible) {
      case 'sign-in':
        return <SignInCard signInClicked={this.signInClicked} errors={this.props.errors} notHaveAccountClicked={this.notHaveAccountClicked}/>
      case 'sign-up':
        return <SignUpCard signUpClicked={this.signUpClicked} errors={this.props.errors} haveAccountClicked={this.haveAccountClicked}/>
      case 'email-confirmation':
        return <EmailConfirmationCard email={this.props.signUpEmail} navigateToRoot={this.props.navigateToRoot}/>
      default:
        break
    }
  }
})

export default AccountCard
