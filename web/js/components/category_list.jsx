import React from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'

import { contentTypes } from 'reducers/topic_feed_reducer.js'

const CategoryList = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired,
    clickedNewest: React.PropTypes.func.isRequired,
    clickedCategoryAtIndex: React.PropTypes.func.isRequired,
    content: React.PropTypes.object.isRequired
  },

  itemClicked: function(event, index) {
    if (index === 0) {
      this.props.clickedNewest()
      return
    }
    this.props.clickedCategoryAtIndex(index - 1)
  },

  getSelectedValue: function() {
    switch (this.props.content.type) {
      case contentTypes.category:
        const selectedIndex = this.props.content.currentCategoryIndex
        return this.props.categories[selectedIndex].id
      case contentTypes.newest:
      default:
        return 0
    }
  },

  render: function() {
    const SelectableList = MakeSelectable(List)
    const items = this.props.categories.map((c) => {
      return (<ListItem
        key={c.id}
        value={c.id}
        primaryText={c.name}
      />)
    })

    const newestItem = (<ListItem
      key={0}
      value={0}
      primaryText="Newest"
    />)
    items.splice(0, 0, newestItem)

    return (
      <SelectableList
        onChange={this.itemClicked}
        value = {this.getSelectedValue()}
      >
        {items}
      </SelectableList>
    )
  }
})

export default CategoryList
