import React from 'react'
import styles from '~/styles.js'

const ChipList = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render: function() {
    return (
      <div style={styles.wrapper}>
        {this.props.children}
      </div>
    )
  }
})

export default ChipList
