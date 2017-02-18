import React from 'react'

import ResponsiveMargin from 'components/common/responsive_margin.jsx'
import PostFormCard from 'components/post_form_card.jsx'

const PostNew = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <ResponsiveMargin>
        <PostFormCard />
      </ResponsiveMargin>
    )
  }
})

export default PostNew
