import React from 'react'
import NavBar from './nav_bar.jsx'
import TopicForm from './topic_form.jsx'

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
        <TopicForm
          title = "Topic Form Title"
          submitButtonLabel = "Submit"
          onSubmit = {(data) => { console.log(data) }}
          secondaryButtonLabel = "Secondary"
          onSecondaryButtonClick = {() => { console.log('topic form secondary button clicked') }}
        />
      </div>
    )
  }
})

export default App
