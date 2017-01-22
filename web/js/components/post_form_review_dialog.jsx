import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { visualizeChange } from 'helpers/diff_helper.jsx'

const PostFormReviewDialog = React.createClass({
  propTypes: {
    open: React.PropTypes.bool.isRequired,
    onlyShowNew: React.PropTypes.bool,
    oldData: React.PropTypes.object,
    newData: React.PropTypes.object,
    onConfirmClicked: React.PropTypes.func.isRequired,
    onAbandonClicked: React.PropTypes.func.isRequired
  },

  getContent: function() {
    const { open, onlyShowNew, oldData, newData } = this.props
    if (!open) {
      return null
    }
    if (onlyShowNew) {
      return <div>
        Content: {newData.content}
      </div>
    } else {
      return visualizeChange(oldData.content, newData.content)
    }
  },

  render: function() {
    const { open, onConfirmClicked, onAbandonClicked } = this.props
    return (
      <Dialog
          title="Review Your Changes"
          modal={true}
          open={open}
          autoScrollBodyContent={true}
          actions={[
            <FlatButton
              label="Abandon"
              onTouchTap={onAbandonClicked}
              />,
            <RaisedButton
              label="Confirm"
              primary={true}
              onTouchTap={onConfirmClicked}
              />
          ]}
        >
        {this.getContent()}
      </Dialog>
    )
  }
})

export default PostFormReviewDialog
