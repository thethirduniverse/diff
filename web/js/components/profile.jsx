import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import React from 'react'

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
          <Paper style={{'maxHeight': '500px', 'maxWidth': '500px', margin: 'auto'}}>
            <img src={this.props.user.avatar} alt="User Avatar" style={{'maxHeight': '100%', 'maxWidth': '100%'}}/>
          </Paper>
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
