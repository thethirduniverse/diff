import { connect } from 'react-redux'

import NavigationList from 'components/navigation_list.jsx'
import { postFeedShowNewest, postFeedShowCategory } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.category.categories,
    content: state.posts.content
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickedNewest: () => {
      dispatch(postFeedShowNewest())
    },
    clickedCategoryAtIndex: (idx) => {
      dispatch(postFeedShowCategory(idx))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList)
