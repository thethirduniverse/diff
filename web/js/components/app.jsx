import React from 'react'
import NavBar from './nav_bar.jsx'
import AccountCardController from '../controllers/account_card_controller.js'
import TopicForm from './topic_form.jsx'

const App = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    const accountStatus = this.props.user.signed_in
      ? <h1>Signed In</h1>
      : <h1>Not Signed In</h1>

      return (
        <div>
          <NavBar />
          <AccountCardController />
          { accountStatus }
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
