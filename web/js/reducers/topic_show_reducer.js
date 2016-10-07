const defaultState = {}
import actions from 'actions'

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.topicShowLoadTopic:
      return {topic: action.topic}
    default:
      return state
  }
}
