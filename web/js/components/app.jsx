import React from 'react'
import AppBar from 'material-ui/AppBar'
import AccountCardController from '../controllers/account_card_controller.js'

const App = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div>
        <AppBar
          title="Debatable"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <AccountCardController />
      </div>
    )
  }
})

export default App
