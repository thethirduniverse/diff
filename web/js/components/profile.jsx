import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Profile = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    userID: React.PropTypes.string.isRequired,
    user: React.PropTypes.object
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    const content = this.props.user
      ? (
        <div>
          <h1>{this.props.user.id}</h1>
          <h1>{this.props.user.email}</h1>
        </div>
      )
      : (<CircularProgress />)

    return (
      <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <h1>Person Profile</h1>
        {content}
      </div>
    )
  }
})

export default Profile
