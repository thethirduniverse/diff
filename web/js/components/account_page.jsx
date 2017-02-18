import React from 'react'

import ResponsiveMargin from 'components/common/responsive_margin.jsx'

const AccountPage = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    return (
      <ResponsiveMargin>
        {this.props.children}
      </ResponsiveMargin>
    )
  }
})

export default AccountPage
