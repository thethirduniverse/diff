import $ from 'jquery'
import { connect } from 'react-redux'

import ReportDialog from 'components/report_dialog.jsx'
import { ReportTypes } from 'reducers/report_reducer.js'
import { reportClear, reportPosted } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    report: state.report.report
  }
}

const _endpointForType = (type) => {
  switch (type) {
    case ReportTypes.user:
      return '/api/report/user'
    case ReportTypes.topic:
      return '/api/report/topic'
    case ReportTypes.reply:
      return '/api/report/reply'
    default:
      return ''
  }
}

const _paramsForPosting = (report, formData, currentUser) => {
  switch (report.type) {
    case ReportTypes.user:
      return {
        report: {
          ...formData.report,
          creator_id: currentUser.id,
          user_id: report.user.id
        }
      }
    case ReportTypes.topic:
      return {
        report: {
          ...formData.report,
          creator_id: currentUser.id,
          topic_id: report.topic.id
        }
      }
    case ReportTypes.reply:
      return {
        report: {
          ...formData.report,
          creator_id: currentUser.id,
          reply_id: report.reply.id
        }
      }
    default:
      return {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _onSubmit: (report, formData, currentUser) => {
      $.post(_endpointForType(report.type), _paramsForPosting(report, formData, currentUser))
        .done((res) => {
          dispatch(reportPosted())
        })
        .fail((res) => {
          console.log('post review failed')
          console.log(res)
        })
    },
    dismiss: () => {
      dispatch(reportClear())
    }
  }
}

const merge = (stateProps, dispatchProps, ownProps) => {
  const { report } = stateProps
  const { _onSubmit } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: (data) => {
      _onSubmit(report, data, ownProps.currentUser)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, merge)(ReportDialog)
