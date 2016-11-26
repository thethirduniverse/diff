import actions, { replyTargets } from 'actions'

const defaultState = {
  topic: null,
  replyTree: [],
  replyIndexes: []
}

export const showPreviousReply = (state, action) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in topic show reducer. Reply tree and reply indexes has differnt depth')
  }

  const level = action.level
  if (level < 0 || level >= state.replyIndexes.length) {
    throw new Error('level outside of range for level ' + level)
  }

  const index = state.replyIndexes[level]
  const newIndex = index === 0 ? state.replyTree[level].length - 1 : index - 1

  return {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), newIndex]
  }
}

export const showNextReply = (state, action) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in topic show reducer. Reply tree and reply indexes has differnt depth')
  }

  const level = action.level
  if (level < 0 || level >= state.replyIndexes.length) {
    throw new Error('level outside of range for level ' + level)
  }

  const index = state.replyIndexes[level]
  const newIndex = index === state.replyTree[level].length - 1 ? 0 : index + 1

  return {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), newIndex]
  }
}

export const appendReplies = (state, action) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in topic show reducer. Reply tree and reply indexes has differnt depth')
  }

  if (action.replies.length > 0) {
    return {
      ...state,
      replyTree: [...state.replyTree, action.replies],
      replyIndexes: [...state.replyIndexes, 0]
    }
  } else {
    return state
  }
}

export const insertReplyIfNeeded = (state, action) => {
  switch (action.target) {
    case replyTargets.topic:
      if (state.topic.id === action.reply.topic_id) {
        return _insertReplyAtRoot(state, action)
      }
      return state
    case replyTargets.reply:
    default:
      throw new Error('Unknown target for action')
  }
}

const _insertReplyAtRoot = (state, action) => {
  const depth = state.replyTree.length

  if (depth === 0) {
    return {
      ...state,
      replyTree: [[action.reply]],
      replyIndexes: [0]
    }
  } else {
    return {
      ...state,
      replyTree: [[...state.replyTree[0], action.reply], ...state.replyTree.slice(1)]
    }
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.topicShowLoadTopic:
      return {
        ...state,
        topic: action.topic,
        replyTree: [],
        replyIndexes: []
      }
    case actions.topicShowShowPreviousReply:
      return showPreviousReply(state, action)
    case actions.topicShowShowNextReply:
      return showNextReply(state, action)
    case actions.topicShowAppendReplies:
      return appendReplies(state, action)
    case actions.replyFormPostedReply:
      return insertReplyIfNeeded(state, action)
    default:
      return state
  }
}
