import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

import ResponsiveMargin from 'components/common/responsive_margin.jsx'
import ProfileForm from 'components/profile_form.jsx'
import PostListController from 'controllers/post_list_controller.js'

const Profile = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    userID: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,

    showEditButton: React.PropTypes.bool.isRequired,
    onEditInfoClicked: React.PropTypes.func.isRequired,
    onCancelEditInfoClicked: React.PropTypes.func.isRequired,
    onSubmitInfoClicked: React.PropTypes.func.isRequired,
    showInfoForm: React.PropTypes.bool.isRequired,
    infoFormErrors: React.PropTypes.object
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  info: function(user) {
    const {showEditButton} = this.props
    return (
       <Card>
        <CardHeader
          title={user.first_name + ' ' + user.last_name}
          avatar={user.avatar}
          />
        <CardText>
          {user.bio}
        </CardText>
        <CardActions>
          {
            showEditButton
              ? (<FlatButton label="Edit Personal Info" onClick={this.props.onEditInfoClicked} />)
              : null
          }
        </CardActions>
      </Card>
    )
  },

  infoForm: function() {
    return (<Card>
      <CardHeader title="Edit Personal Info" />
      <ProfileForm
        onSubmitClicked={this.props.onSubmitInfoClicked}
        onCancelClicked={this.props.onCancelEditInfoClicked}
        errors={this.props.infoFormErrors}
        />
    </Card>)
  },

  infoContent: function(user) {
    return this.props.showInfoForm ? this.infoForm() : this.info(user)
  },

  render: function() {
    const user = this.props.user
    const content = user
      ? (
        <div>
          {this.infoContent(user)}
          <h1>Posted Topics</h1>
          <PostListController />
        </div>
      )
      : (<CircularProgress />)

    return (
      <ResponsiveMargin>
        {content}
      </ResponsiveMargin>
    )
  }
})

export default Profile
