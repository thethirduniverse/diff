const actions = {
  userShowSignInForm: 'USER_SHOW_SIGN_IN_FORM',
  userShowSignUpForm: 'USER_SHOW_SIGN_UP_FORM',
  userSignIn: 'USER_SIGN_IN',
  userSignUp: 'USER_SIGN_UP',
  userSignOut: 'USER_SIGN_OUT',
  userShowSignInError: 'USER_SHOW_SIGN_IN_ERROR',
  userShowSignUpError: 'USER_SHOW_SIGN_UP_ERROR',
  topicFeedAppendBack: 'TOPIC_FEED_APPEND_BACK',
  topicFeedReload: 'TOPIC_FEED_RELOAD',
  topicFeedShowNewest: 'TOPIC_FEED_SHOW_NEWEST',
  topicFeedShowCategory: 'TOPIC_FEED_SHOW_CATEGORY',
  topicShowLoadTopic: 'TOPIC_SHOW_LOAD_TOPIC',
  topicFormAddCategory: 'TOPIC_FORM_ADD_CATEGORY',
  topicFormRemoveCategory: 'TOPIC_FORM_REMOVE_CATEGORY',
  profileLoadUser: 'PROFILE_LOAD_USER',
  categoryLoad: 'CATEGORY_LOAD',
}
export default actions

export const userShowSignInForm = () => {
  return {
    type: actions.userShowSignInForm
  }
}

export const userShowSignUpForm = () => {
  return {
    type: actions.userShowSignUpForm
  }
}

export const userSignIn = (user) => {
  return {
    type: actions.userSignIn,
    user: user
  }
}

export const userSignUp = (user) => {
  return {
    type: actions.userSignUp,
    user: user
  }
}

export const userSignOut = () => {
  return {
    type: actions.userSignOut
  }
}

export const userShowSignInError = (e) => {
  return {
    type: actions.userShowSignInError,
    error: e
  }
}

export const userShowSignUpError = (e) => {
  return {
    type: actions.userShowSignUpError,
    error: e
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

export const topicFeedShowNewest = () => {
  return {
    type: actions.topicFeedShowNewest
  }
}

export const topicFeedShowCategory = (idx) => {
  return {
    type: actions.topicFeedShowCategory,
    index: idx
  }
}

export const topicShowLoadTopic = (topic) => {
  return {
    type: actions.topicShowLoadTopic,
    topic
  }
}

export const topicFormAddCategory = (category) => {
  return {
    type: actions.topicFormAddCategory,
    category
  }
}

export const topicFormRemoveCategory = (categoryId) => {
  return {
    type: actions.topicFormRemoveCategory,
    categoryId
  }
}

export const profileLoadUser = (user) => {
  return {
    type: actions.profileLoadUser,
    user
  }
}

export const categoryLoad = (categories) => {
  return {
    type: actions.categoryLoad,
    categories
  }
}
