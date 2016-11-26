const actions = {
  accountResetPasswordUpdateErrors: 'ACCOUNT_RESET_PASSWORD_UPDATE_ERRORS',
  accountResetPasswordUpdatePasswordErrors: 'ACCOUNT_RESET_PASSWORD_UPDATE_PASSWORD_ERRORS',
  accountResetPasswordShowBadTokenDialog: 'ACCOUNT_RESET_PASSWORD_SHOW_BAD_TOKEN_DIALOG',
  accountResetPasswordHideBadTokenDialog: 'ACCOUNT_RESET_PASSWORD_HIDE_BAD_TOKEN_DIALOG',
  userSignIn: 'USER_SIGN_IN',
  userSignOut: 'USER_SIGN_OUT',
  userShowSignInError: 'USER_SHOW_SIGN_IN_ERROR',
  userShowSignUpError: 'USER_SHOW_SIGN_UP_ERROR',
  topicFeedLoadMore: 'TOPIC_FEED_LOAD_MORE',
  topicFeedReload: 'TOPIC_FEED_RELOAD',
  topicFeedShowNewest: 'TOPIC_FEED_SHOW_NEWEST',
  topicFeedShowCategory: 'TOPIC_FEED_SHOW_CATEGORY',
  topicShowLoadTopic: 'TOPIC_SHOW_LOAD_TOPIC',
  topicShowShowPreviousReply: 'TOPIC_SHOW_SHOW_PREVIOUS_REPLY',
  topicShowShowNextReply: 'TOPIC_SHOW_SHOW_NEXT_REPLY',
  topicShowShowReplyAtIndex: 'TOPIC_SHOW_SHOW_REPLY_AT_INDEX',
  topicShowAppendReplies: 'TOPIC_SHOW_APPEND_REPLIES',
  topicFormAddCategory: 'TOPIC_FORM_ADD_CATEGORY',
  topicFormRemoveCategory: 'TOPIC_FORM_REMOVE_CATEGORY',
  topicFormUpdateCategoryFilter: 'TOPIC_FORM_UPDATE_CATEGORY_FILTER',
  topicFormUpdateErrors: 'TOPIC_FORM_UPDATE_ERRORS',
  replyFormClearTarget: 'REPLY_FORM_CLEAR_TARGET',
  replyFormSetTargetTopic: 'REPLY_FORM_SET_TARGET_TOPIC',
  replyFormSetTargetReply: 'REPLY_FORM_SET_TARGET_REPLY',
  replyFormUpdateErrors: 'REPLY_FORM_UPDATE_ERRORS',
  replyFormPostedReply: 'REPLY_FORM_POSTED_REPLY',
  profileLoadUser: 'PROFILE_LOAD_USER',
  profileLoadMorePostedTopics: 'PROFILE_LOAD_MORE_POSTED_TOPICS',
  profileShowAvatarForm: 'PROFILE_SHOW_AVATAR_FORM',
  profileHideAvatarForm: 'PROFILE_HIDE_AVATAR_FORM',
  profileUpdateAvatarFormErrors: 'PROFILE_UPDATE_AVATAR_FORM_ERRORS',
  categoryLoad: 'CATEGORY_LOAD'
}
export default actions

export const accountResetPasswordUpdateErrors = (errors) => {
  return {
    type: actions.accountResetPasswordUpdateErrors,
    errors
  }
}

export const accountResetPasswordUpdatePasswordErrors = (errors) => {
  return {
    type: actions.accountResetPasswordUpdatePasswordErrors,
    errors
  }
}

export const accountResetPasswordShowBadTokenDialog = () => {
  return {
    type: actions.accountResetPasswordShowBadTokenDialog
  }
}

export const accountResetPasswordHideBadTokenDialog = () => {
  return {
    type: actions.accountResetPasswordHideBadTokenDialog
  }
}

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

/* eslint-disable camelcase */
export const topicFeedLoadMore = (topics, has_more, next_offset) => {
  return {
    type: actions.topicFeedLoadMore,
    topics,
    has_more,
    next_offset
  }
}

export const topicFeedReload = (topics, has_more, next_offset) => {
  return {
    type: actions.topicFeedReload,
    topics,
    has_more,
    next_offset
  }
}
/* eslint-enable camelcase */

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

export const topicShowShowPreviousReply = (level) => {
  return {
    type: actions.topicShowShowPreviousReply,
    level
  }
}

export const topicShowShowNextReply = (level) => {
  return {
    type: actions.topicShowShowNextReply,
    level
  }
}

export const topicShowShowReplyAtIndex = (level, index) => {
  return {
    type: actions.topicShowShowReplyAtIndex,
    level,
    index
  }
}

export const topicShowAppendReplies = (replies) => {
  return {
    type: actions.topicShowAppendReplies,
    replies
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

export const replyTargets = {
  topic: 'topic',
  reply: 'reply'
}

export const replyFormPostedReply = (target, reply) => {
  return {
    type: actions.replyFormPostedReply,
    target,
    reply
  }
}

export const replyFormSetTargetTopic = (topic) => {
  return {
    type: actions.replyFormSetTargetTopic,
    topic
  }
}

export const replyFormClearTarget = () => {
  return {
    type: actions.replyFormClearTarget
  }
}

export const replyFormSetTargetReply = (reply) => {
  return {
    type: actions.replyFormSetTargetReply,
    reply
  }
}

export const profileLoadUser = (user) => {
  return {
    type: actions.profileLoadUser,
    user
  }
}

/* eslint-disable camelcase */
export const profileLoadMorePostedTopics = (topics, has_more, next_offset) => {
  return {
    type: actions.profileLoadMorePostedTopics,
    topics,
    has_more,
    next_offset
  }
}
/* eslint-enable camelcase */

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
