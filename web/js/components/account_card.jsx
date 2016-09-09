import React from 'react'
import SignInCard from './sign_in.jsx'
import SignUpCard from './sign_up.jsx'

const AccountCard = React.createClass({
  propTypes: {
    haveAccountClicked: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired,
    signInClicked: React.PropTypes.func.isRequired,
    signUpClicked: React.PropTypes.func.isRequired,
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

  render: function() {
    return this.props.visible === 'sign-in'
      ? <SignInCard signInClicked={this.signInClicked} notHaveAccountClicked={this.notHaveAccountClicked}/>
      : <SignUpCard signUpClicked={this.signUpClicked} haveAccountClicked={this.haveAccountClicked}/>
  }
})

export default AccountCard
