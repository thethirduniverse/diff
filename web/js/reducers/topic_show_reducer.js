import actions, { replyTargets, topicShowAppendReplies } from 'actions'

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

  const newState = {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), newIndex]
  }
  resetLastLevelExpandeds(newState.replyTree)
  return newState
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

  const newState = {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), newIndex]
  }
  resetLastLevelExpandeds(newState.replyTree)
  return newState
}

export const appendReplies = (state, action) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in topic show reducer. Reply tree and reply indexes has differnt depth')
  }

  if (action.replies.length > 0) {
    return {
      ...state,
      replyTree: [...state.replyTree, action.replies.map((r) => (
        {
          ...r,
          _expanded: false
        }
      ))],
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

export const showReplyAtIndex = (state, action) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in topic show reducer. Reply tree and reply indexes has differnt depth')
  }

  const level = action.level
  if (level < 0 || level >= state.replyIndexes.length) {
    throw new Error('level outside of range for level ' + level)
  }

  if (action.index < 0 || action.index >= state.replyTree[level].length) {
    throw new Error('index outside of range for index ' + action.index)
  }

  const newState = {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), action.index]
  }
  resetLastLevelExpandeds(newState.replyTree)
  return newState
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

export const expandReply = (state, action) => {
  if (action.replies.length === 0) {
    return state
  }

  const loc = findReply(state.replyTree, action.reply.id)
  const newState = {
    ...state,
    replyTree: [...state.replyTree.slice(0, loc.level), state.replyTree[loc.level]],
    replyIndexes: [...state.replyIndexes.slice(0, loc.level), loc.idx]
  }

  resetLastLevelExpandeds(newState.replyTree)
  state.replyTree[loc.level][loc.idx]._expanded = true

  return appendReplies(newState, topicShowAppendReplies(action.replies))
}

const resetLastLevelExpandeds = (replyTree) => {
  if (replyTree.length === 0) {
    return
  }
  const last = replyTree[replyTree.length - 1]
  last.forEach((reply) => {
    reply._expanded = false
  })
}

export const findReply = (replyTree, rid) => {
  for (var i = 0; i < replyTree.length; i++) {
    const replies = replyTree[i]
    for (var j = 0; j < replies.length; j++) {
      const reply = replies[j]
      if (reply.id === rid) {
        return {
          level: i,
          idx: j
        }
      }
    }
  }
  return null
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
    case actions.topicShowShowReplyAtIndex:
      return showReplyAtIndex(state, action)
    case actions.topicShowExpandReply:
      return expandReply(state, action)
    case actions.topicShowAppendReplies:
      return appendReplies(state, action)
    case actions.replyFormPostedReply:
      return insertReplyIfNeeded(state, action)
    default:
      return state
  }
}
