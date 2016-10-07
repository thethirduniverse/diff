import $ from 'jquery'
import { connect } from 'react-redux'

import CategoryList from 'components/category_list.jsx'
import { topicFeedShowNewest, topicFeedShowCategory } from 'actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.category.categories,
    content: state.topics.content
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
