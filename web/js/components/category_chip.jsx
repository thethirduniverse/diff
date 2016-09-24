import React from 'react'
import Chip from 'material-ui/Chip'
import styles from '../styles.js'

const CategoryChip = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired,
    onChipClick: React.PropTypes.func
  },

  render: function() {
    const handleClick = this.props.onChipClick
      ? this.props.onChipClick.bind(this, this.props.category.id)
      : undefined

    return (
      <Chip
        style={styles.chip}
        onClick={handleClick}
      >
        {this.props.category.name}
      </Chip>
    )
  }
})

export default CategoryChip
