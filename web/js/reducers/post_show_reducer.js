import actions from 'actions'

const defaultState = {
  replyTree: [],
  replyIndexes: []
}

export const showPreviousReply = (state, level) => {
  checkConsistency(state)
  checkLevel(state, level)

  const index = state.replyIndexes[level]
  const newIndex = index === 0 ? state.replyTree[level].length - 1 : index - 1
  return showReplyAtIndex(state, level, newIndex)
}

export const showNextReply = (state, level) => {
  checkConsistency(state)
  checkLevel(state, level)

  const index = state.replyIndexes[level]
  const newIndex = index === state.replyTree[level].length - 1 ? 0 : index + 1
  return showReplyAtIndex(state, level, newIndex)
}

export const showReplyAtIndex = (state, level, idx) => {
  checkConsistency(state)
  checkLevelIdx(state, level, idx)

  var newState = collapseReplies(state, level)
  return expandReplies(newState, idx)
  /*
  const newState = {
    ...state,
    replyTree: state.replyTree.slice(0, level + 1),
    replyIndexes: [...state.replyIndexes.slice(0, level), idx]
  }
  return newState
  */
}

export const appendReplies = (state, replyId, replies) => {
  checkConsistency(state)
  if (replies.length === 0) {
    return state
  }

  for (var level = 0; level < state.replyTree.length - 1; level++) {
    const idx = state.replyIndexes[level]
    const reply = state.replyTree[level][idx]
    if (reply.id === replyId) {
      return appendRepliesAtLevel(state, replies, level + 1)
    }
  }

  const lastLevel = state.replyTree.length - 1
  const idx = state.replyIndexes[lastLevel]
  const reply = state.replyTree[lastLevel][idx]
  if (reply.id === replyId) {
    return appendRepliesAtNewLevel(state, replies)
  }
  throw new Error('append for unexpanded replies are not supported now')
}

const appendRepliesAtLevel = (state, replies, level) => {
  return {
    ...state,
    replyTree: [
      ...state.replyTree.slice(0, level),
      [...state.replyTree[level], ...replies],
      ...state.replyTree.slice(level + 1)
    ]
  }
}

const appendRepliesAtNewLevel = (state, replies) => {
  return {
    ...state,
    replyTree: [...state.replyTree, replies],
    replyIndexes: [...state.replyIndexes, 0]
  }
}

export const collapseReplies = (state, level) => {
  const replyIndexes = state.replyIndexes
  var replyTree = state.replyTree

  if (replyTree.length < level + 1) {
    throw new Error('invalid level specified for collapse replies')
  }

  while (replyTree.length > level + 1) {
    const parentLevel = replyTree.length - 2
    const childLevel = replyTree.length - 1

    const idx = replyIndexes[parentLevel]
    const parent = {
      ...replyTree[parentLevel][replyIndexes[parentLevel]],
      replies: replyTree[childLevel]
    }

    replyTree = [
      ...replyTree.slice(0, parentLevel),
      [
        ...replyTree[parentLevel].slice(0, idx),
        parent,
        ...replyTree[parentLevel].slice(idx + 1, replyTree[parentLevel].length)
      ]
    ]
  }

  return {
    ...state,
    replyTree,
    replyIndexes: replyIndexes.slice(0, level + 1)
  }
}

export const expandReplies = (state, index) => {
  var replyIndexes = [...state.replyIndexes.slice(0, state.replyIndexes.length - 1), index]
  var replyTree = state.replyTree

  var reply = replyTree[replyTree.length - 1][replyIndexes[replyIndexes.length - 1]]
  while (reply && reply.replies) {
    const lastLevel = replyTree.length - 1
    const newIndex = replyIndexes[lastLevel]

    const {replies, ...rest} = reply
    replyIndexes = [...replyIndexes, 0]
    replyTree = [
      ...replyTree.slice(0, lastLevel),
      [
        ...replyTree[lastLevel].slice(0, newIndex),
        rest,
        ...replyTree[lastLevel].slice(newIndex + 1, replyTree[lastLevel].length)
      ],
      replies
    ]
    reply = replyTree[replyTree.length - 1][replyIndexes[replyIndexes.length - 1]]
  }

  return {
    ...state,
    replyTree,
    replyIndexes
  }
}

const checkConsistency = (state) => {
  if (state.replyTree.length !== state.replyIndexes.length) {
    throw new Error('Internal inconsistency in post show reducer. Reply tree and reply indexes has differnt depth')
  }
}

const checkLevel = (state, level) => {
  if (level < 0 || level >= state.replyIndexes.length) {
    throw new Error('level outside of range for level ' + level)
  }
}

const checkLevelIdx = (state, level, idx) => {
  checkLevel(state, level)
  if (idx < 0 || idx >= state.replyTree[level].length) {
    throw new Error('index outside of range for index ' + idx)
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.postShowLoadTopic:
      return {
        ...state,
        replyTree: [[action.post]],
        replyIndexes: [0]
      }
    case actions.postShowShowPreviousReply:
      return showPreviousReply(state, action.level)
    case actions.postShowShowNextReply:
      return showNextReply(state, action.level)
    case actions.postShowShowReplyAtIndex:
      return showReplyAtIndex(state, action.level, action.index)
    case actions.postShowAppendReplies:
      return appendReplies(state, action.replyId, action.replies)
    default:
      return state
  }
}
