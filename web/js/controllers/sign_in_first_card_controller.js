import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SignInFirstCard from 'components/sign_in_first_card.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    promptText: ownProps.promptText,
    _location: ownProps.location
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _loginClicked: (loc) => {
      dispatch(push({
        pathname: '/sign-in',
        query: {
          ref: loc
        }
      }))
    }
  }
}

const mergeProps = (s, d, o) => {
  const { _location } = s
  const { _loginClicked } = d
  return {
    ...s,
    ...d,
    ...o,
    loginClicked: () => {
      _loginClicked(_location)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignInFirstCard)
