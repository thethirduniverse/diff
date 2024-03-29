import React from 'react'

import EditList from './edit_list.jsx'

const EditIndex = React.createClass({
  propTypes: {
    onComponentWillMount: React.PropTypes.func.isRequired
  },

  componentWillMount: function() {
    this.props.onComponentWillMount()
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <EditList
              {...this.props}
              />
          </div>
        </div>
      </div>
    )
  }
})

export default EditIndex
