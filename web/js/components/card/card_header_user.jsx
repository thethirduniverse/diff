import React from 'react'
import { CardHeader } from 'material-ui/Card'

import styles from '~/styles'
import { nameOfUser } from 'helpers/user_helper'

const CardHeaderUser = (user, onHeaderClicked, prefix) => {
  if (!user) {
    return null
  }
  return <CardHeader
    title={(prefix || '') + nameOfUser(user)}
    subtitle={user.bio}
    avatar={user.avatar}
    onClick={onHeaderClicked}
    style={styles.clickable}
    />
}

export default CardHeaderUser
