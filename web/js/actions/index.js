const actions = {
  accountCardShowSignIn: 'SHOW_SIGN_IN',
  accountCardShowSignUp: 'SHOW_SIGN_UP',
  userSignIn: 'USER_SIGN_IN',
  userSignUp: 'USER_SIGN_UP',
  userSignOut: 'USER_SIGN_OUT',
  topicFeedAppendBack: 'TOPIC_FEED_APPEND_BACK',
  topicFeedReload: 'TOPIC_FEED_RELOAD',
  topicShowLoadTopic: 'TOPIC_SHOW_LOAD_TOPIC',
  profileLoadUser: 'PROFILE_LOAD_USER'
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

export const topicFeedAppendBack = (topics) => {
  return {
    type: actions.topicFeedAppendBack,
    topics
  }
}

export const topicFeedReload = (topics) => {
  return {
    type: actions.topicFeedReload,
    topics
  }
}

export const topicShowLoadTopic = (topic) => {
  return {
    type: actions.topicShowLoadTopic,
    topic
  }
}

export const profileLoadUser = (user) => {
  return {
    type: actions.profileLoadUser,
    user
  }
}
