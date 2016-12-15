import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'

const Footer = React.createClass({
  render: function() {
    return (
      <Paper style={{
        /* eslint-disable react/prop-types */
        color: this.props.muiTheme.palette.alternateTextColor,
        backgroundColor: this.props.muiTheme.palette.primary1Color,
          /* eslint-enable react/prop-types */
        height: '300px',
        marginTop: '50px'
      }}>
      <div style={{
        textAlign: 'center',
        paddingTop: '130px'
      }}>
      Copyright &copy; Diff.com 2016-Current. All rights reserved.
    </div>
  </Paper>
    )
  }
})

export default muiThemeable()(Footer)
