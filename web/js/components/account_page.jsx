import React from 'react'

import AccountCard from 'components/account_card.jsx'
import NavigationListController from 'controllers/navigation_list_controller.js'
import TopicFeedController from 'controllers/topic_feed_controller.js'

const AccountPage = React.createClass({
  propTypes: {
    // props for account card
    errors: React.PropTypes.object,
    haveAccountClicked: React.PropTypes.func.isRequired,
    navigateToRoot: React.PropTypes.func.isRequired,
    notHaveAccountClicked: React.PropTypes.func.isRequired,
    onComponentWillMount: React.PropTypes.func,
    signInClicked: React.PropTypes.func.isRequired,
    signUpClicked: React.PropTypes.func.isRequired,
    signUpEmail: React.PropTypes.string,
    visible: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <AccountCard
              errors={this.props.errors}
              haveAccountClicked={this.props.haveAccountClicked}
              navigateToRoot={this.props.navigateToRoot}
              notHaveAccountClicked={this.props.notHaveAccountClicked}
              onComponentWillMount={this.props.onComponentWillMount}
              signInClicked={this.props.signInClicked}
              signUpClicked={this.props.signUpClicked}
              signUpEmail={this.props.signUpEmail}
              visible={this.props.visible}
            />
          </div>
        </div>
      </div>
    )
  }
})

export default AccountPage
