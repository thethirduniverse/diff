import React from 'react'

import ResponsiveMargin from 'components/common/responsive_margin.jsx'
import styles from '~/styles'

const About = React.createClass({
  render: function() {
    return (
      <ResponsiveMargin>
        <h1 style={styles.title}>About Diff</h1>
        {
          this.content.map((text, idx) => (
            <p key={idx} style={styles.textBlock}>{text}</p>
          ))
        }
      </ResponsiveMargin>
    )
  },

  content: [
    'Diff is a free online platform for exchaning ideas. You are welcomed to engage in deep conversations with other people on topics that you care about, as long as you remain respectful.',
    'Diff is currently under beta testing. If you have any feedback or request (including requesting a invitation code), please don\'t hesitate to contact me at gyan4@wisc.edu .',
    'Best,',
    'Guanqing Yan'
  ]
})

export default About
