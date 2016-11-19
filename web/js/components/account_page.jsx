import React from 'react'

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

export default AccountPage
