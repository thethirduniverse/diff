export const accountCardShowSignIn = () => {
  return {
    type: 'SHOW_SIGN_IN'
  }
}

export const accountCardShowSignUp = () => {
  return {
    type: 'SHOW_SIGN_UP'
  }
}

export const userSignIn = (user) => {
  return {
    type: 'USER_SIGN_IN',
    user: user
  }
}

export const userSignUp = () => {
  return {
    type: 'USER_SIGN_UP'
  }
}

export const userSignOut = () => {
  return {
    type: 'USER_SIGN_OUT'
  }
}
