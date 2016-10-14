import Chip from 'material-ui/Chip'
import React from 'react'

import styles from '~/styles.js'

const CategoryChip = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired,
    onChipClick: React.PropTypes.func,
    onRequestDelete: React.PropTypes.func
  },

  render: function() {
    const handleClick = this.props.onChipClick
      ? this.props.onChipClick.bind(this, this.props.category.id)
      : undefined

    const requestDelete = this.props.onRequestDelete
      ? this.props.onRequestDelete.bind(this, this.props.category.id)
      : undefined

    return (
      <Chip
        style={styles.chip}
        onClick={handleClick}
        onRequestDelete={requestDelete}
      >
        {this.props.category.name}
      </Chip>
    )
  }
})

export default CategoryChip
