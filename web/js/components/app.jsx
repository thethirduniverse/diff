import React from 'react'
import NavBar from './nav_bar.jsx'
import AccountCardController from '../controllers/account_card_controller.js'
import HomeController from '../controllers/home_controller.js'
import TopicForm from './topic_form.jsx'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    onSignOutClicked: React.PropTypes.func.isRequired,
    userSignedIn: React.PropTypes.bool.isRequired
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
        />
        <AccountCardController />
        <TopicForm
          title = "Topic Form Title"
          submitButtonLabel = "Submit"
          onSubmit = {(data) => { console.log(data) }}
          secondaryButtonLabel = "Secondary"
          onSecondaryButtonClick = {() => { console.log('topic form secondary button clicked') }}
        />
        <HomeController />
      </div>
    )
  }
})

export default App
