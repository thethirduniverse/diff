import React from 'react'

import EditCard from './edit_card.jsx'

const EditList = React.createClass({
  propTypes: {
    edits: React.PropTypes.array.isRequired
  },

  render: function() {
    const { edits } = this.props
    return (
      <div>
        {
          edits.map((e) => (
            <EditCard
              edit={e}
              key={e.version}
              />
          ))
        }
      </div>
    )
  }
})

export default EditList
