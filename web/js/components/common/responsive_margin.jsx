import React from 'react'

const ResponsiveMargin = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render: function() {
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          {this.props.children}
        </div>
      </div>
    </div>)
  }
})

export default ResponsiveMargin
