const actions = {
  userShowSignInForm: 'USER_SHOW_SIGN_IN_FORM',
  userShowSignUpForm: 'USER_SHOW_SIGN_UP_FORM',
  userSignIn: 'USER_SIGN_IN',
  userSignUp: 'USER_SIGN_UP',
  userSignOut: 'USER_SIGN_OUT',
  userShowSignInError: 'USER_SHOW_SIGN_IN_ERROR',
  userShowSignUpError: 'USER_SHOW_SIGN_UP_ERROR',
  topicFeedLoadMore: 'TOPIC_FEED_LOAD_MORE',
  topicFeedReload: 'TOPIC_FEED_RELOAD',
  topicFeedShowNewest: 'TOPIC_FEED_SHOW_NEWEST',
  topicFeedShowCategory: 'TOPIC_FEED_SHOW_CATEGORY',
  topicShowLoadTopic: 'TOPIC_SHOW_LOAD_TOPIC',
  topicFormAddCategory: 'TOPIC_FORM_ADD_CATEGORY',
  topicFormRemoveCategory: 'TOPIC_FORM_REMOVE_CATEGORY',
  topicFormUpdateCategoryFilter: 'TOPIC_FORM_UPDATE_CATEGORY_FILTER',
  topicFormUpdateErrors: 'TOPIC_FORM_UPDATE_ERRORS',
  replyFormUpdateErrors: 'REPLY_FORM_UPDATE_ERRORS',
  profileLoadUser: 'PROFILE_LOAD_USER',
  profileShowAvatarForm: 'PROFILE_SHOW_AVATAR_FORM',
  profileHideAvatarForm: 'PROFILE_HIDE_AVATAR_FORM',
  profileUpdateAvatarFormErrors: 'PROFILE_UPDATE_AVATAR_FORM_ERRORS',
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

export const topicFeedLoadMore = (topics, has_more, next_offset) => {
  return {
    type: actions.topicFeedLoadMore,
    topics,
    has_more,
    next_offset,
  }
}

export const topicFeedReload = (topics, has_more, next_offset) => {
  return {
    type: actions.topicFeedReload,
    topics,
    has_more,
    next_offset,
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

export const topicFormUpdateCategoryFilter = (filter) => {
  return {
    type: actions.topicFormUpdateCategoryFilter,
    filter
  }
}

export const topicFormUpdateErrors = (errors) => {
  return {
    type: actions.topicFormUpdateErrors,
    errors
  }
}

export const replyFormUpdateErrors = (errors) => {
  return {
    type: actions.replyFormUpdateErrors,
    errors
  }
}

export const profileLoadUser = (user) => {
  return {
    type: actions.profileLoadUser,
    user
  }
}

export const profileShowAvatarForm = () => {
  return {
    type: actions.profileShowAvatarForm
  }
}

export const profileHideAvatarForm = () => {
  return {
    type: actions.profileHideAvatarForm
  }
}

export const profileUpdateAvatarFormErrors = (errors) => {
  return {
    type: actions.profileUpdateAvatarFormErrors,
    errors
  }
}

export const categoryLoad = (categories) => {
  return {
    type: actions.categoryLoad,
    categories
  }
}
