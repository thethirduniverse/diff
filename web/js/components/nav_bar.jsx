import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert'
import React from 'react'

import styles from '~/styles.js'

const NavBar = ({userSignedIn, onSignOutClicked, onSignInClicked, onTitleClicked, onProfileClicked}) => {
  const iconMenu = (
    userSignedIn
      ? <IconMenu
        iconButtonElement = {
          <IconButton><MoreIcon /></IconButton>
        }
        anchorOrigin = {{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin = {{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Profile" onClick={onProfileClicked} />
        <MenuItem primaryText="Sign Out" onClick={onSignOutClicked} />
      </IconMenu>
      : <FlatButton label="Login" onClick={onSignInClicked}/>
  )

  return <AppBar
    title={<span style={styles.title}>Debatable</span>}
    onTitleTouchTap = {onTitleClicked}
    showMenuIconButton = {false}
    iconElementRight = {iconMenu}
  />
}

NavBar.propTypes = {
  userSignedIn: React.PropTypes.bool.isRequired,
  onSignOutClicked: React.PropTypes.func.isRequired,
  onSignInClicked: React.PropTypes.func.isRequired,
  onTitleClicked: React.PropTypes.func.isRequired,
  onProfileClicked: React.PropTypes.func
}

export default NavBar
