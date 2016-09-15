const actions = {
  accountCardShowSignIn: 'SHOW_SIGN_IN',
  accountCardShowSignUp: 'SHOW_SIGN_UP',
  userSignIn: 'USER_SIGN_IN',
  userSignUp: 'USER_SIGN_UP',
  userSignOut: 'USER_SIGN_OUT',
}
export default actions

export const accountCardShowSignIn = () => {
  return {
    type: actions.accountCardShowSignIn
  }
}

export const accountCardShowSignUp = () => {
  return {
    type: actions.accountCardShowSignUp
  }
}

export const userSignIn = (user) => {
  return {
    type: actions.userSignIn,
    user: user
  }
}

export const userSignUp = () => {
  return {
    type: actions.userSignUp
  }
}

export const userSignOut = () => {
  return {
    type: actions.userSignOut
  }
}
