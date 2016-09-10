import { connect } from 'react-redux'
import $ from 'jquery'
import App from '../components/app.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.post('/users/verify').
        done((res) => {
          console.log('verify successed with response:')
          console.log(res)
        }).
        fail((res) => {
          console.log('verify failed with response:')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
