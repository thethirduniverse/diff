const defaultState = {topics: []}
import actions from '../actions'

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.topicFeedAppendBack:
      return {topics: [...state.topics, ...action.topics]}
    case actions.topicFeedReload:
      return {topics: action.topics}
    default:
      return state
  }
}
