import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'

import ResponsiveMargin from 'components/common/responsive_margin.jsx'
import styles from '~/styles.js'

const InvitationPage = React.createClass({
  propTypes: {
    message: React.PropTypes.string,
    code: React.PropTypes.string,
    oldCodes: React.PropTypes.array,
    generated: React.PropTypes.bool,
    limitExceeded: React.PropTypes.bool,

    generateClicked: React.PropTypes.func
  },

  getCodeContent: (code) => (
    <div>Your Code: {code}</div>
  ),

  getOldCodesContent: (codes) => (
    <div>
      Your unused codes:
      <ul>
        {
          codes.map((c, idx) => (<li key={idx}>{c}</li>))
        }
      </ul>
    </div>
  ),

  getContent: function() {
    const {message, code, oldCodes} = this.props
    const codeContent = code ? this.getCodeContent(code) : null
    const codesContent = oldCodes.length >= 1 ? this.getOldCodesContent(oldCodes) : null

    return (<div>
      {message}
      {codeContent}
      {codesContent}
    </div>)
  },

  render: function() {
    return (
      <ResponsiveMargin>
        <Card>
          {/* eslint-disable react/prop-types */}
          <CardTitle
            style={{ ...styles.title, color: this.props.muiTheme.palette.primary2Color }}>
            Invite friends to join diff!
                {/* eslint-enable react/prop-types */}
          </CardTitle>
          <CardText>
            <p>Diff is not yet open to the public. But don't worry, you can still invite friends to join. Simple generate a code and give it to your friend, and your friend will be able to register using the code! </p>
            {this.getContent()}
          </CardText>
          <CardActions>
            <FlatButton
              primary={true}
              disabled={this.props.limitExceeded}
              label={this.props.generated
                ? 'Generate Another Code'
                : 'Generate Invitation Code'
              }
              onClick={this.props.generateClicked}
              />
          </CardActions>
        </Card>
      </ResponsiveMargin>
    )
  }
})

export default muiThemeable()(InvitationPage)
