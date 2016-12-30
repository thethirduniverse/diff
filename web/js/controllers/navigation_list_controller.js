import { connect } from 'react-redux'

import NavigationList from 'components/navigation_list.jsx'
import { postFeedShowNewest, postFeedShowOther, postFeedShowCategory } from 'actions'

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
    clickedOther: () => {
      dispatch(postFeedShowOther())
    },
    clickedCategory: (id) => {
      dispatch(postFeedShowCategory(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationList)
