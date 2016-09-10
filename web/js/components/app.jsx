import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
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
        <AppBar
          title = 'Debatable'
          showMenuIconButton = {false}
          iconElementRight = {
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              anchorOrigin = {{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin = {{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="item 1" />
              <MenuItem primaryText="item 2" />
              <MenuItem primaryText="item 3" />
            </IconMenu>
          }
        />
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
