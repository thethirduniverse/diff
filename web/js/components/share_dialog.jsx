import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const ShareDialog = React.createClass({
  propTypes: {
    dismiss: React.PropTypes.func.isRequired,
    link: React.PropTypes.string
  },

  render: function() {
    const {dismiss, link} = this.props

    return (
      <Dialog
        title="Share Post"
        open={link != null}
        onRequestClose={dismiss}
      >
        Copy the link and share it with other.
        <TextField
          fullWidth={true}
          value={link}
          name="share-link"
        />
        <FlatButton
          label="Dismiss"
          primary={true}
          onClick={dismiss}
        />
      </Dialog>
    )
  }
})

export default ShareDialog
