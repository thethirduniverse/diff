import actions, { replyTargets } from 'actions'

const defaultState = {
  target_topic: null,
  target_reply: null,
  errors: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.replyFormUpdateErrors:
      return {
        ...state,
        errors: action.errors
      }
    case actions.replyFormSetTargetTopic:
      return {
        ...state,
        target_topic: action.topic,
        target_reply: null
      }
    case actions.replyFormSetTargetReply:
      return {
        ...state,
        target_topic: null,
        target_reply: action.reply
      }
    default:
      return state
  }
}
