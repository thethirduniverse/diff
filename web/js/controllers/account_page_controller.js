import $ from 'jquery'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AccountPage from 'components/account_page.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    _userSignedIn: state.accountReducer.signed_in
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _navigateBack: () => {
      const ref = ownProps.location.query.ref
      dispatch(push(ref ? ref : '/'))
    }
  }
}

const mergeProps = (s, d, o) => {
  return {
    ...s,
    ...d,
    ...o,
    onComponentWillMount: () => {
      if (s._userSignedIn) {
        d._navigateBack()
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountPage)
