import $ from 'jquery'
import { connect } from 'react-redux'

import Invite from 'components/invitation.jsx'
import {inviteShowCode, inviteShowOldCodes, inviteShowError} from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.invitation.message,
    code: state.invitation.code,
    oldCodes: state.invitation.oldCodes,
    generated: state.invitation.generated,
    limitExceeded: state.invitation.limitExceeded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    generateClicked: () => {
      $.post('/api/invitation-code')
        .done((res) => {
          if (res.code) {
            dispatch(inviteShowCode(res.code))
          } else if (res.codes) {
            dispatch(inviteShowOldCodes(res.error, res.codes))
          }
        })
        .fail((res) => {
          if (res.error) {
            dispatch(inviteShowError(res.error))
          }
          console.log('post review failed')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invite)
