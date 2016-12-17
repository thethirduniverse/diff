import React from 'react'

import PostFormCard from 'components/post_form_card.jsx'

const PostNew = React.createClass({
  propTypes: {
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <PostFormCard />
          </div>
        </div>
      </div>
    )
  }
})

export default PostNew
