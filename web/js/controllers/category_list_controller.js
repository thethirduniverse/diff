import { connect } from 'react-redux'
import $ from 'jquery'
import CategoryList from '../components/category_list.jsx'
import { categoryChange, categoryShowNewest } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
