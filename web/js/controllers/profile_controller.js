import { connect } from 'react-redux'
import $ from 'jquery'
import Profile from '../components/profile.jsx'
import { profileLoadUser } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    userID: ownProps.params.id,
    user: state.profile.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount: () => {
      $.get('/api/profiles/' + ownProps.params.id)
        .done((res) => {
          dispatch(profileLoadUser(res.user))
        })
        .fail((res) => {
          console.log('load user with response:')
          console.log(res)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
