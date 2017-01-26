import $ from 'jquery'
import { connect } from 'react-redux'

import ReportDialog from 'components/report_dialog.jsx'
import { ReportTypes } from 'reducers/report_reducer.js'
import { reportClear, reportPosted } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    report: state.report.report,
    posted: state.report.posted
  }
}

const _endpointForType = (type) => {
  switch (type) {
    case ReportTypes.user:
      return '/api/report/user'
    case ReportTypes.post:
      return '/api/report/post'
    case ReportTypes.edit:
      return '/api/report/edit'
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
          user_id: report.user.id
        }
      }
    case ReportTypes.post:
      return {
        report: {
          ...formData.report,
          post_id: report.post.id
        }
      }
    case ReportTypes.edit:
      return {
        report: {
          ...formData.report,
          edit_id: report.edit.id
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
