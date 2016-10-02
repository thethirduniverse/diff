import actions from '../actions'

export const contentTypes = {
  newest: "TOPIC_FEED_SHOW_NEWEST",
  category: "TOPIC_FEED_SHOW_CATEGORY"
}

const defaultState = {
  topics: [],
  content: {
    type: contentTypes.newest,
    currentCategoryIndex: 0,
    loaded: false
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.topicFeedAppendBack:
      return {
        ...state,
        topics: [...state.topics, ...action.topics]
      }
    case actions.topicFeedReload:
      return {
        ...state,
        content: {
          ...state.content,
          loaded: true
        },
        topics: action.topics,
      }
    case actions.topicFeedShowNewest:
      const contentTypeWasNotNewest = state.content.type !== contentTypes.newest

      return {
        ...state,
        topics: contentTypeWasNotNewest ? [] : state.topics,
        content: {
          ...state.content,
          type: contentTypes.newest,
          loaded: !contentTypeWasNotNewest
        }
      }
    case actions.topicFeedShowCategory:
      const contentTypeWasNotCategory = state.content.type !== contentTypes.category
      const contentIndexChanged = state.content.currentCategoryIndex !== action.index
      const changed = contentTypeWasNotCategory || contentIndexChanged

      return {
        ...state,
        topics: changed ? [] : state.topics,
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
