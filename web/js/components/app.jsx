import React from 'react'
import NavBar from './nav_bar.jsx'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func,
    onSignOutClicked: React.PropTypes.func.isRequired,
    onSignInClicked: React.PropTypes.func.isRequired,
    onTitleClicked: React.PropTypes.func.isRequired,
    userSignedIn: React.PropTypes.bool.isRequired,
    onProfileClicked: React.PropTypes.func,
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
        />
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            {this.props.children}
        </div>
      </div>
    )
  }
})

export default App
