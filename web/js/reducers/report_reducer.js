import actions from 'actions'

export const ReportTypes = {
  user: 'USER',
  post: 'POST',
  none: 'NONE'
}

const defaultState = {
  report: {
    type: ReportTypes.none,
    user: null,
    post: null
  },
  posted: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.reportUser:
      return {
        ...state,
        report: {
          type: ReportTypes.user,
          user: action.user,
          post: null
        },
        posted: false
      }
    case actions.reportPost:
      return {
        ...state,
        report: {
          type: ReportTypes.post,
          post: action.post,
          user: null
        },
        posted: false
      }
    case actions.reportPosted:
      return {
        ...state,
        report: {
          type: ReportTypes.posted,
          user: null,
          post: null
        },
        posted: true
      }
    case actions.reportClear:
      return {
        ...state,
        report: {
          type: ReportTypes.none,
          user: null,
          post: null
        },
        posted: true
      }
    default:
      return state
  }
}
