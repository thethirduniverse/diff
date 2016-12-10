import actions from 'actions'

export const ReportTypes = {
  user: 'USER',
  topic: 'TOPIC',
  reply: 'REPLY',
  none: 'NONE',
  posted: 'POSTED'
}

const defaultState = {
  report: {
    type: ReportTypes.none,
    user: null,
    topic: null,
    reply: null
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.reportUser:
      return {
        ...state,
        report: {
          type: ReportTypes.user,
          user: action.user,
          topic: null,
          reply: null
        }
      }
    case actions.reportTopic:
      return {
        ...state,
        report: {
          type: ReportTypes.topic,
          topic: action.topic,
          user: null,
          reply: null
        }
      }
    case actions.reportReply:
      return {
        ...state,
        report: {
          type: ReportTypes.reply,
          reply: action.reply,
          topic: null,
          user: null
        }
      }
    case actions.reportPosted:
      return {
        ...state,
        report: {
          type: ReportTypes.posted,
          reply: null,
          topic: null,
          user: null
        }
      }
    case actions.reportClear:
      return {
        ...state,
        report: {
          type: ReportTypes.none,
          reply: null,
          topic: null,
          user: null
        }
      }
    default:
      return state
  }
}
