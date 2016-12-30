import actions from 'actions'

export const contentTypes = {
  newest: 'POST_FEED_SHOW_NEWEST',
  other: 'POST_FEED_SHOW_OTHER',
  category: 'POST_FEED_SHOW_CATEGORY'
}

const defaultState = {
  posts: [],
  content: {
    type: contentTypes.newest,
    currentCategoryId: 0,
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
      const categoryChanged = state.content.currentCategoryId !== action.id
      if (!contentTypeWasNotCategory && !categoryChanged) {
        return state
      }

      return {
        ...state,
        posts: [],
        content: {
          ...state.content,
          type: contentTypes.category,
          currentCategoryId: action.id,
          loaded: false
        }
      }
    case actions.postFeedShowOther:
      if (state.content.type === contentTypes.other) {
        return state
      }

      return {
        ...state,
        posts: [],
        content: {
          ...state.content,
          type: contentTypes.other,
          loaded: false
        }
      }
    default:
      return state
  }
}
