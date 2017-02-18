import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert'
import React from 'react'

import styles from '~/styles.js'

const NavBar = ({userSignedIn, onSignOutClicked, onSignInClicked, onTitleClicked, onProfileClicked, onNewTopicClicked, onInviteClicked, onAboutClicked}) => {
  const iconMenu = (
    userSignedIn
      ? <IconMenu
        iconButtonElement = {
          <IconButton><MoreIcon /></IconButton>
        }
        anchorOrigin = {{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin = {{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="New Topic" onClick={onNewTopicClicked} />
        <MenuItem primaryText="Invite Friends" onClick={onInviteClicked} />
        <MenuItem primaryText="Profile" onClick={onProfileClicked} />
        <MenuItem primaryText="About Diff" onClick={onAboutClicked} />
        <MenuItem primaryText="Sign Out" onClick={onSignOutClicked} />
      </IconMenu>
      : <FlatButton label="Login" onClick={onSignInClicked}/>
  )

  return <AppBar
    title={<span style={{...styles.clickable, ...styles.title}}>Diff</span>}
    onTitleTouchTap = {onTitleClicked}
    showMenuIconButton = {false}
    iconElementRight = {iconMenu}
    >
      { /* hacky code to make the button looks exactly like the right icon button */}
      {
        userSignedIn
          ? null
          : (<div style={{ marginTop: '8px', marginRight: '-16px', marginLeft: 'auto' }}>
            <FlatButton style={{ marginTop: '7px', color: 'white' }} label="About Diff" onClick={onAboutClicked} />
          </div>)
      }
    </AppBar>
}

NavBar.propTypes = {
  userSignedIn: React.PropTypes.bool.isRequired,
  onSignOutClicked: React.PropTypes.func.isRequired,
  onSignInClicked: React.PropTypes.func.isRequired,
  onTitleClicked: React.PropTypes.func.isRequired,
  onProfileClicked: React.PropTypes.func,
  onNewTopicClicked: React.PropTypes.func.isRequired,
  onInviteClicked: React.PropTypes.func.isRequired,
  onAboutClicked: React.PropTypes.func.isRequired
}

export default NavBar
