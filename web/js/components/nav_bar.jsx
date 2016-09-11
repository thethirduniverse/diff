import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoodGoodIcon from 'material-ui/svg-icons/social/mood'
import MoodBadIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'

const NavBar = ({userSignedIn, onSignOutClicked, onSignInClicked, onTitleClicked}) => {
  const iconMenu = (
    userSignedIn
      ? <IconMenu
        iconButtonElement = {
          <IconButton><MoodGoodIcon /></IconButton>
        }
        anchorOrigin = {{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin = {{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Sign Out" onClick={onSignOutClicked} />
      </IconMenu>
      : <IconMenu
        iconButtonElement = {
          <IconButton><MoodBadIcon /></IconButton>
        }
        anchorOrigin = {{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin = {{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign In" onClick={onSignInClicked}/>
      </IconMenu>
  )

  return <AppBar
    title = 'Debatable'
    onTitleTouchTap = {onTitleClicked}
    showMenuIconButton = {false}
    iconElementRight = {iconMenu}
  />
}

NavBar.propTypes = {
  userSignedIn: React.PropTypes.bool.isRequired,
  onSignOutClicked: React.PropTypes.func.isRequired,
  onSignInClicked: React.PropTypes.func.isRequired,
  onTitleClicked: React.PropTypes.func.isRequired
}

export default NavBar
