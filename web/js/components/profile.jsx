import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import React from 'react'

import AvatarForm from 'components/profile_avatar_form.jsx'

const Profile = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    userID: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,

    onSubmitAvatarClicked: React.PropTypes.func.isRequired,
    onShowAvatarClicked: React.PropTypes.func.isRequired,
    onCancelAvatarClicked: React.PropTypes.func.isRequired,
    showAvatarForm: React.PropTypes.bool.isRequired,
    avatarFormErrors: React.PropTypes.object
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  avatarContent: function() {
    const avatar = (
      <div>
        <Paper style={{'maxHeight': '500px', 'maxWidth': '500px', margin: 'auto'}}>
          <img src={this.props.user.avatar} alt="User Avatar" style={{'maxHeight': '100%', 'maxWidth': '100%'}}/>
        </Paper>
        <FlatButton label="Change Avatar" onClick={this.props.onShowAvatarClicked}/>
      </div>
    )
    return this.props.showAvatarForm
      ? <AvatarForm
        onSubmitAvatarClicked={this.props.onSubmitAvatarClicked}
        onCancelAvatarClicked={this.props.onCancelAvatarClicked}
        errors={this.props.avatarFormErrors}
      />
      : avatar
  },

  render: function() {
    const content = this.props.user
      ? (
        <div>
          {this.avatarContent()}
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
