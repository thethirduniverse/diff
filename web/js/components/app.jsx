import React from 'react'

import NavBar from 'components/nav_bar.jsx'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func,
    onSignOutClicked: React.PropTypes.func.isRequired,
    onSignInClicked: React.PropTypes.func.isRequired,
    onTitleClicked: React.PropTypes.func.isRequired,
    userSignedIn: React.PropTypes.bool.isRequired,
    onProfileClicked: React.PropTypes.func,
    onNewTopicClicked: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired
  },

  componentWillMount: function() {
    const f = this.props.onComponentWillMount
    if (f) {
      f()
    }
  },

  render: function() {
    return (
      <div>
        <NavBar
          userSignedIn = {this.props.userSignedIn}
          onSignOutClicked = {this.props.onSignOutClicked}
          onSignInClicked = {this.props.onSignInClicked}
          onTitleClicked = {this.props.onTitleClicked}
          onProfileClicked = {this.props.onProfileClicked}
          onNewTopicClicked = {this.props.onNewTopicClicked}
        />
        {this.props.children}
      </div>
    )
  }
})

export default App
