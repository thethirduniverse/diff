import actions from 'actions'

const defaultState = {
  loading_post_id: null,
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

const loadedPost = (p) => ({
  ...p,
  _loaded: true
})

const unloadedPost = (p) => ({
  ...p,
  _loaded: false
})

const loadedPosts = (posts) => (
  posts.map((p) => (loadedPost(p)))
)

const unloadedPostsFromPostIds = (ids) => (
  ids.map((id) => (
    unloadedPost({
      id: id
    })
  ))
)

const upvotedPost = (p) => ({
  ...p,
  upvote_count: p.upvote_count + 1,
  user_upvoted: true
})

const upvoteCanceledPost = (p) => ({
  ...p,
  upvote_count: p.upvote_count - 1,
  user_upvoted: false
})

export const postOptimisticUpvote = (state, postId) => {
  const post = findPost(state, postId)
  if (!post) {
    return state
  }
  return mergeRawPosts(state, post.parent_post_id, [upvotedPost(post)])
}

export const postOptimisticCancelUpvote = (state, postId) => {
  const post = findPost(state, postId)
  if (!post) {
    return state
  }
  return mergeRawPosts(state, post.parent_post_id, [upvoteCanceledPost(post)])
}

export const mergePostPlaceholders = (state, parentId, postIds) => {
  return mergeRawPosts(state, parentId, unloadedPostsFromPostIds(postIds))
}

export const mergeLoadedPosts = (state, parentId, posts) => {
  return mergeRawPosts(state, parentId, loadedPosts(posts))
}

export const mergeRawPosts = (state, parentId, rawPosts) => {
  checkConsistency(state)
  if (rawPosts.length === 0) {
    return state
  }

  // if root, the assumption is that no valid id should be 0
  if (!parentId && rawPosts.length === 1 && rawPosts[0].id === state.replyTree[0][0].id) {
    return mergePostsAtLevel(state, rawPosts, 0)
  }

  for (var level = 0; level < state.replyTree.length - 1; level++) {
    const idx = state.replyIndexes[level]
    const reply = state.replyTree[level][idx]
    if (reply.id === parentId) {
      return mergePostsAtLevel(state, rawPosts, level + 1)
    }
  }

  const lastLevel = state.replyTree.length - 1
  const idx = state.replyIndexes[lastLevel]
  const reply = state.replyTree[lastLevel][idx]
  if (reply.id === parentId) {
    return appendPostsAtNewLevel(state, rawPosts)
  }

  throw new Error('append for unexpanded replies are not supported now')
}

const mergePostsAtLevel = (state, posts, level) => {
  return {
    ...state,
    replyTree: [
      ...state.replyTree.slice(0, level),
      mergePosts(state.replyTree[level], posts),
      ...state.replyTree.slice(level + 1)
    ]
  }
}

const mergePosts = (oldPosts, newPosts) => {
  const posts = [...oldPosts]
  newPosts.forEach((newPost) => {
    const idx = posts.findIndex((p) => (p.id === newPost.id))
    if (idx !== -1) {
      // we only forbid it goes from loaded to not loaded
      if (!posts[idx]._loaded || newPost._loaded) {
        posts[idx] = newPost
      }
    } else {
      posts.push(newPost)
    }
  })
  return posts
}

const appendPostsAtNewLevel = (state, replies) => {
  return {
    ...state,
    replyTree: [...state.replyTree, replies],
    replyIndexes: [...state.replyIndexes, 0]
  }
}

const findPost = (state, postId) => {
  var res = null
  state.replyTree.forEach((posts) => {
    if (!res) {
      res = posts.find((p) => (p.id === postId))
    }
  })
  return res
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
        replyTree: [[loadedPost(action.post)]],
        replyIndexes: [0]
      }
    case actions.postShowShowPreviousReply:
      return showPreviousReply(state, action.level)
    case actions.postShowShowNextReply:
      return showNextReply(state, action.level)
    case actions.postShowShowReplyAtIndex:
      return showReplyAtIndex(state, action.level, action.index)
    case actions.postShowMergePostPlaceholders:
      return mergePostPlaceholders(state, action.parentId, action.postIds)
    case actions.postShowMergeLoadedPosts:
      return mergeLoadedPosts(state, action.parentId, action.posts)
    case actions.postShowStartLoadPost:
      return {
        ...state,
        loading_post_id: action.postId
      }
    case actions.postShowCancelLoadPost:
      if (action.postId !== state.loading_post_id) {
        return state
      }
      return {
        ...state,
        loading_post_id: null
      }
    case actions.postShowFinishedLoadPost:
      if (action.post.id !== state.loading_post_id) {
        return state
      }
      return mergeLoadedPosts({
        ...state,
        loading_post_id: null
      }, action.post.parent_post_id, [action.post])
    case actions.postOptimisticUpvote:
      return postOptimisticUpvote(state, action.postId)
    case actions.postOptimisticCancelUpvote:
      return postOptimisticCancelUpvote(state, action.postId)
    default:
      return state
  }
}
