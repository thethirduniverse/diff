import { connect } from 'react-redux'

import NavigationList from 'components/navigation_list.jsx'
import { topicFeedShowNewest, topicFeedShowCategory } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.category.categories,
    content: state.posts.content
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickedNewest: () => {
      dispatch(topicFeedShowNewest())
    },
    clickedCategoryAtIndex: (idx) => {
      dispatch(topicFeedShowCategory(idx))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList)
