import React from 'react'

import EditCard from './edit_card.jsx'

const EditList = React.createClass({
  propTypes: {
    edits: React.PropTypes.array.isRequired,
    onHeaderClicked: React.PropTypes.func.isRequired,
    onReportEditClicked: React.PropTypes.func.isRequired
  },

  render: function() {
    const { edits, onHeaderClicked, onReportEditClicked } = this.props
    return (
      <div>
        {
          edits.map((e) => (
            <EditCard
              edit={e}
              key={e.version}
              onHeaderClicked={onHeaderClicked.bind(null, e)}
              onReportEditClicked={onReportEditClicked.bind(null, e)}
              />
          ))
        }
      </div>
    )
  }
})

export default EditList
