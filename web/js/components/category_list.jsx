import React from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'

const CategoryList = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired
  },

  itemClicked: function(event, index) {
    console.log('clicked item at position ' + index)
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
      >
        {items}
      </SelectableList>
    )
  }
})

export default CategoryList
