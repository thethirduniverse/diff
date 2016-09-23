import React from 'react'
import NavBar from './nav_bar.jsx'
import TopicFormController from '../controllers/topic_form_controller.js'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    onSignOutClicked: React.PropTypes.func.isRequired,
    onSignInClicked: React.PropTypes.func.isRequired,
    onTitleClicked: React.PropTypes.func.isRequired,
    userSignedIn: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node.isRequired
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    return (
      <div>
        <NavBar
          userSignedIn = {this.props.userSignedIn}
          onSignOutClicked = {this.props.onSignOutClicked}
          onSignInClicked = {this.props.onSignInClicked}
          onTitleClicked = {this.props.onTitleClicked}
        />
        {this.props.children}
        <TopicFormController />
      </div>
    )
  }
})

export default App
