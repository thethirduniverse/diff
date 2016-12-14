import actions from 'actions'

export const contentTypes = {
  newest: 'POST_FEED_SHOW_NEWEST',
  category: 'POST_FEED_SHOW_CATEGORY'
}

const defaultState = {
  posts: [],
  content: {
    type: contentTypes.newest,
    currentCategoryIndex: 0,
    loaded: false,

    has_more: true,
    next_offset: 0
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.postFeedLoadMore:
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
        content: {
          ...state.content,
          has_more: action.has_more,
          next_offset: action.next_offset
        }
      }
    case actions.postFeedReload:
      return {
        ...state,
        content: {
          ...state.content,
          loaded: true,
          has_more: action.has_more,
          next_offset: action.next_offset
        },
        posts: action.posts
      }
    case actions.postFeedShowNewest:
      const contentTypeWasNotNewest = state.content.type !== contentTypes.newest

      return {
        ...state,
        posts: contentTypeWasNotNewest ? [] : state.posts,
        content: {
          ...state.content,
          type: contentTypes.newest,
          loaded: !contentTypeWasNotNewest
        }
      }
    case actions.postFeedShowCategory:
      const contentTypeWasNotCategory = state.content.type !== contentTypes.category
      const contentIndexChanged = state.content.currentCategoryIndex !== action.index
      const changed = contentTypeWasNotCategory || contentIndexChanged

      return {
        ...state,
        posts: changed ? [] : state.posts,
        content: {
          ...state.content,
          type: contentTypes.category,
          currentCategoryIndex: action.index,
          loaded: !changed
        }
      }
    default:
      return state
  }
}
