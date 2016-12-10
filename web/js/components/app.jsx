import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

import NavBar from 'components/nav_bar.jsx'
import ReportController from 'controllers/report_controller.js'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func,
    onSignOutClicked: React.PropTypes.func.isRequired,
    onSignInClicked: React.PropTypes.func.isRequired,
    onTitleClicked: React.PropTypes.func.isRequired,
    userSignedIn: React.PropTypes.bool.isRequired,
    onProfileClicked: React.PropTypes.func,
    onNewTopicClicked: React.PropTypes.func.isRequired,

    showError: React.PropTypes.bool.isRequired,
    errorDescription: React.PropTypes.string.isRequired,
    onDismissErrorClicked: React.PropTypes.func.isRequired,

    user: React.PropTypes.object,

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
        <Dialog
          title="Sorry, an error occurred."
          actions={[
            <RaisedButton
              label="Dismiss"
              primary={true}
              onTouchTap={this.props.onDismissErrorClicked}
              />
          ]}
          modal={false}
          open={this.props.showError}
          onRequestClose={this.props.onDismissErrorClicked}
        >
          {this.props.errorDescription}
        </Dialog>
        <ReportController currentUser={this.props.user}/>
        {this.props.children}
      </div>
    )
  }
})

export default App
