import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { ReportTypes } from 'reducers/report_reducer.js'
import ReportForm from 'components/report_form.jsx'

const ReportDialog = React.createClass({
  propTypes: {
    posted: React.PropTypes.bool.isRequired,
    report: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired
  },

  _getTitle: function() {
    const {posted, report} = this.props

    if (posted) {
      return 'Report Posted'
    }
    switch (report.type) {
      case ReportTypes.user:
        return 'Report User'
      case ReportTypes.post:
        return 'Report Post'
      default:
        return ''
    }
  },

  _getContent: function() {
    const {posted, report} = this.props

    if (posted) {
      return 'Your report is succesfully posted and will be reviewed by the administrator. We will contact you when review is finished.'
    }
    switch (report.type) {
      case ReportTypes.user:
        return 'Reporting: ' + report.user.email
      case ReportTypes.post:
        return 'Reporting: ' + report.post.content
      default:
        return ''
    }
  },

  render: function() {
    const {posted, report} = this.props

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
