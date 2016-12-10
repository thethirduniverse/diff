import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { ReportTypes } from 'reducers/report_reducer.js'
import ReportForm from 'components/report_form.jsx'

const ReportDialog = React.createClass({
  propTypes: {
    report: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired
  },

  _getTitle: function() {
    const report = this.props.report
    switch (report.type) {
      case ReportTypes.user:
        return 'Report User'
      case ReportTypes.topic:
        return 'Report Topic'
      case ReportTypes.reply:
        return 'Report Reply'
      case ReportTypes.posted:
        return 'Report Posted'
      default:
        return ''
    }
  },

  _getContent: function() {
    const report = this.props.report
    switch (report.type) {
      case ReportTypes.user:
        return 'Reporting: ' + report.user.email
      case ReportTypes.topic:
        return 'Reporting: ' + report.topic.content
      case ReportTypes.reply:
        return 'Reporting: ' + report.reply.content
      case ReportTypes.posted:
        return 'Your report is succesfully posted and will be reviewed by the administrator. We will contact you when review is finished.'
      default:
        return ''
    }
  },

  render: function() {
    const report = this.props.report
    const posted = report.type === ReportTypes.posted

    return (
      <Dialog
        title={this._getTitle()}
        open={report.type !== ReportTypes.none}
        onRequestClose={this.props.dismiss}
      >
        {this._getContent()}
        {
          posted
            ? <FlatButton label="Dismiss" onClick={this.props.dismiss} />
            : <ReportForm
              onSubmit={this.props.onSubmit}
              onSecondaryButtonClick={this.props.dismiss}
            />
        }
      </Dialog>
    )
  }
})

export default ReportDialog
