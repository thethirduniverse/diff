const actions = {
  appShowError: 'APP_SHOW_ERROR',
  appDismissError: 'APP_DISMISS_ERROR',
  accountResetPasswordUpdateErrors: 'ACCOUNT_RESET_PASSWORD_UPDATE_ERRORS',
  accountResetPasswordUpdatePasswordErrors: 'ACCOUNT_RESET_PASSWORD_UPDATE_PASSWORD_ERRORS',
  accountResetPasswordShowBadTokenDialog: 'ACCOUNT_RESET_PASSWORD_SHOW_BAD_TOKEN_DIALOG',
  accountResetPasswordHideBadTokenDialog: 'ACCOUNT_RESET_PASSWORD_HIDE_BAD_TOKEN_DIALOG',
  userSignIn: 'USER_SIGN_IN',
  userSignOut: 'USER_SIGN_OUT',
  userShowSignInError: 'USER_SHOW_SIGN_IN_ERROR',
  userShowSignUpError: 'USER_SHOW_SIGN_UP_ERROR',
  postFeedLoadMore: 'POST_FEED_LOAD_MORE',
  postFeedReload: 'POST_FEED_RELOAD',
  postFeedShowNewest: 'POST_FEED_SHOW_NEWEST',
  postFeedShowCategory: 'POST_FEED_SHOW_CATEGORY',
  postShowLoadTopic: 'POST_SHOW_LOAD_POST',
  postShowShowPreviousReply: 'POST_SHOW_SHOW_PREVIOUS_REPLY',
  postShowShowNextReply: 'POST_SHOW_SHOW_NEXT_REPLY',
  postShowShowReplyAtIndex: 'POST_SHOW_SHOW_REPLY_AT_INDEX',
  postShowMergePostPlaceholders: 'POST_SHOW_MERGE_POST_PLACEHOLDERS',
  postShowMergeLoadedPosts: 'POST_SHOW_MERGE_LOADED_POSTS',
  postShowStartLoadPost: 'POST_SHOW_START_LOAD_POST',
  postShowCancelLoadPost: 'POST_SHOW_CANCEL_LOAD_POST',
  postShowFinishedLoadPost: 'POST_SHOW_FINISHED_LOAD_POST',
  postFormAddCategory: 'POST_FORM_ADD_CATEGORY',
  postFormRemoveCategory: 'POST_FORM_REMOVE_CATEGORY',
  postFormUpdateCategoryFilter: 'POST_FORM_UPDATE_CATEGORY_FILTER',
  postFormUpdateErrors: 'POST_FORM_UPDATE_ERRORS',
  postFormCreateRoot: 'POST_FORM_CREATE_ROOT',
  postFormUpdateReplyTarget: 'POST_FORM_UPDATE_REPLY_TARGET',
  postFormUpdateEditTarget: 'POST_FORM_UPDATE_EDIT_TARGET',
  postFormClearTarget: 'POST_FORM_CLEAR_TARGET',
  postOptimisticUpvote: 'POST_OPTIMISITIC_UPVOTE',
  postOptimisticCancelUpvote: 'POST_OPTIMISITIC_CANCEL_UPVOTE',
  profileLoadUser: 'PROFILE_LOAD_USER',
  profileLoadMorePostedTopics: 'PROFILE_LOAD_MORE_POSTED_POSTS',
  profileShowInfoForm: 'PROFILE_SHOW_INFO_FORM',
  profileHideInfoForm: 'PROFILE_HIDE_INFO_FORM',
  profileUpdateInfoFormErrors: 'PROFILE_UPDATE_INFO_FORM_ERRORS',
  categoryLoad: 'CATEGORY_LOAD',
  reportUser: 'REPORT_USER',
  reportPost: 'REPORT_POST',
  reportPosted: 'REPORT_POSTED',
  reportClear: 'REPORT_CLEAR',
  shareLinkShow: 'SHARE_LINK_SHOW',
  shareLinkDismiss: 'SHARE_LINK_DISMISS',
  inviteShowCode: 'INVITE_SHOW_CODE',
  inviteShowOldCodes: 'INVITE_SHOW_OLD_CODES',
  inviteShowError: 'INVITE_SHOW_ERROR'
}
export default actions

export const appShowError = (description, res) => {
  return {
    type: actions.appShowError,
    description,
    res
  }
}

export const appDismissError = () => {
  return {
    type: actions.appDismissError
  }
}

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
export const postFeedLoadMore = (posts, has_more, next_offset) => {
  return {
    type: actions.postFeedLoadMore,
    posts,
    has_more,
    next_offset
  }
}

export const postFeedReload = (posts, has_more, next_offset) => {
  return {
    type: actions.postFeedReload,
    posts,
    has_more,
    next_offset
  }
}
/* eslint-enable camelcase */

export const postFeedShowNewest = () => {
  return {
    type: actions.postFeedShowNewest
  }
}

export const postFeedShowCategory = (idx) => {
  return {
    type: actions.postFeedShowCategory,
    index: idx
  }
}

export const postShowLoadTopic = (post) => {
  return {
    type: actions.postShowLoadTopic,
    post
  }
}

export const postShowShowPreviousReply = (level) => {
  return {
    type: actions.postShowShowPreviousReply,
    level
  }
}

export const postShowShowNextReply = (level) => {
  return {
    type: actions.postShowShowNextReply,
    level
  }
}

export const postShowShowReplyAtIndex = (level, index) => {
  return {
    type: actions.postShowShowReplyAtIndex,
    level,
    index
  }
}

export const postShowMergePostPlaceholders = (parentId, postIds) => {
  return {
    type: actions.postShowMergePostPlaceholders,
    parentId,
    postIds
  }
}

export const postShowMergeLoadedPosts = (parentId, posts) => {
  return {
    type: actions.postShowMergeLoadedPosts,
    parentId,
    posts
  }
}

export const postShowStartLoadPost = (postId) => {
  return {
    type: actions.postShowStartLoadPost,
    postId
  }
}

export const postShowCancelLoadPost = () => {
  return {
    type: actions.postShowCancelLoadPost
  }
}

export const postShowFinishedLoadPost = (post) => {
  return {
    type: actions.postShowFinishedLoadPost,
    post
  }
}

export const postFormAddCategory = (category) => {
  return {
    type: actions.postFormAddCategory,
    category
  }
}

export const postFormRemoveCategory = (categoryId) => {
  return {
    type: actions.postFormRemoveCategory,
    categoryId
  }
}

export const postFormUpdateCategoryFilter = (filter) => {
  return {
    type: actions.postFormUpdateCategoryFilter,
    filter
  }
}

export const postFormUpdateErrors = (errors) => {
  return {
    type: actions.postFormUpdateErrors,
    errors
  }
}

export const postFormCreateRoot = () => {
  return {
    type: actions.postFormCreateRoot
  }
}

export const postFormUpdateReplyTarget = (post) => {
  return {
    type: actions.postFormUpdateReplyTarget,
    post
  }
}

export const postFormUpdateEditTarget = (post) => {
  return {
    type: actions.postFormUpdateEditTarget,
    post
  }
}

export const postFormClearTarget = () => {
  return {
    type: actions.postFormClearTarget
  }
}

export const postOptimisticUpvote = (postId) => {
  return {
    type: actions.postOptimisticUpvote,
    postId
  }
}

export const postOptimisticCancelUpvote = (postId) => {
  return {
    type: actions.postOptimisticCancelUpvote,
    postId
  }
}

export const profileLoadUser = (user) => {
  return {
    type: actions.profileLoadUser,
    user
  }
}

/* eslint-disable camelcase */
export const profileLoadMorePostedTopics = (posts, has_more, next_offset) => {
  return {
    type: actions.profileLoadMorePostedTopics,
    posts,
    has_more,
    next_offset
  }
}
/* eslint-enable camelcase */

export const profileShowInfoForm = () => {
  return {
    type: actions.profileShowInfoForm
  }
}

export const profileHideInfoForm = () => {
  return {
    type: actions.profileHideInfoForm
  }
}

export const profileUpdateInfoFormErrors = (errors) => {
  return {
    type: actions.profileUpdateInfoFormErrors,
    errors
  }
}

export const categoryLoad = (categories) => {
  return {
    type: actions.categoryLoad,
    categories
  }
}

export const reportUser = (user) => {
  return {
    type: actions.reportUser,
    user
  }
}

export const reportPost = (post) => {
  return {
    type: actions.reportPost,
    post
  }
}

export const reportPosted = () => {
  return {
    type: actions.reportPosted
  }
}

export const reportClear = () => {
  return {
    type: actions.reportClear
  }
}

export const shareLinkShow = (link) => {
  return {
    type: actions.shareLinkShow,
    link
  }
}

export const shareLinkDismiss = () => {
  return {
    type: actions.shareLinkDismiss
  }
}

export const inviteShowCode = (code) => {
  return {
    type: actions.inviteShowCode,
    code
  }
}

export const inviteShowOldCodes = (message, codes) => {
  return {
    type: actions.inviteShowOldCodes,
    message,
    codes
  }
}

export const inviteShowError = (message) => {
  return {
    type: actions.inviteShowError,
    message
  }
}
