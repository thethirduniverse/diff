import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { nameOfUser } from 'helpers/user_helper.js'
import { truncatedContent } from 'helpers/post_helper.js'
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
        return 'Report User: ' + nameOfUser(report.user)
      case ReportTypes.post:
        return 'Report Post: ' + truncatedContent(report.post.content, 100)
      default:
        return ''
    }
  },

  _getContent: function() {
    const {posted} = this.props

    if (posted) {
      return 'Your report is succesfully posted and will be reviewed by the administrator. We will contact you when review is finished.'
    }
    return ''
  },

  render: function() {
    const {posted, report} = this.props

    return (
      <Dialog
        title={this._getTitle()}
        open={report.type !== ReportTypes.none}
        onRequestClose={this.props.dismiss}
        autoScrollBodyContent={true}
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
