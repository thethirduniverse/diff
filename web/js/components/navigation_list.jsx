import React from 'react'
import {List, ListItem, makeSelectable} from 'material-ui/List'

import { contentTypes } from 'reducers/post_feed_reducer.js'

const NavigationList = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired,
    clickedNewest: React.PropTypes.func.isRequired,
    clickedOther: React.PropTypes.func.isRequired,
    clickedCategory: React.PropTypes.func.isRequired,
    content: React.PropTypes.object.isRequired
  },

  itemClicked: function(event, val) {
    if (val === 0) {
      this.props.clickedNewest()
      return
    }
    if (val === -1) {
      this.props.clickedOther()
      return
    }
    this.props.clickedCategory(val)
  },

  getSelectedValue: function() {
    switch (this.props.content.type) {
      case contentTypes.category:
        return this.props.content.currentCategoryId
      case contentTypes.other:
        return -1
      default:
        return 0
    }
  },

  render: function() {
    const SelectableList = makeSelectable(List)
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

    const otherItem = (<ListItem
      key={-1}
      value={-1}
      primaryText="Other"
    />)
    items.push(otherItem)

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

export default NavigationList
