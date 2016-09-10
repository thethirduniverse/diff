import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import AccountCardController from '../controllers/account_card_controller.js'

const App = React.createClass({
  propTypes: {
  },

  render: function() {
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
      </div>
    )
  }
})

export default App
