import { connect } from 'react-redux'
import $ from 'jquery'
import App from '../components/app.jsx'
import { userSignIn } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userSignedIn: state.accountReducer.signed_in,
    user: state.accountReducer.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.post('/users/verify').
        done((res) => {
          console.log('verify successed with response:')
          console.log(res)
          dispatch(userSignIn(res))
        }).
        fail((res) => {
          console.log('verify failed with response:')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
