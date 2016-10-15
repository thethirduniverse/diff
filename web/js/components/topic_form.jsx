import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import CategoryChip from 'components/category_chip.jsx'
import ChipList from 'components/chip_list.jsx'
import { renderTextField } from 'helpers/redux_form_helpers.jsx'

var TopicForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string,

    submitButtonLabel: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,

    secondaryButtonLabel: React.PropTypes.string,
    onSecondaryButtonClick: React.PropTypes.func,

    categories: React.PropTypes.array.isRequired,
    onRequestDelete: React.PropTypes.func,
    categoryAutoCompletions: React.PropTypes.array,
    onUpdateCategoryInput: React.PropTypes.func.isRequired,
    onNewCategoryRequest: React.PropTypes.func.isRequired,
    categoryInput: React.PropTypes.string.isRequired,

    errors: React.PropTypes.object
  },

  getDefaultProps: () => {
    return {
      submitButtonLabel: 'Submit',
      secondaryButtonLabel: 'Report'
    }
  },

  render: function() {
    const categoryChips = this.props.categories.map((c) => (
      <CategoryChip key={c.id} category={c} onRequestDelete={this.props.onRequestDelete} />
    ))

    return (
      <form>
        <Field name="topic[title]" label="Title" type="text" fullWidth={true} errorText={this.props.errors.title} component={renderTextField} />
        <Field name="topic[content]" label="Content" type="text" fullWidth={true} multiLine={true} errorText={this.props.errors.content} component={renderTextField} />
        <ChipList>
          {categoryChips}
          {/* Suppose user entered 'a', and there is a category called 'AAA'.
         It is the controller that figures out 'AAA' should be in the dateSource
         array. The existence of the filter field on AutoComplete is simply to
         let AutoComplete recognize the option 'AAA'. */}
         <AutoComplete
           hintText="Enter a category"
           filter={AutoComplete.caseInsensitiveFilter}
           dataSource={this.props.categoryAutoCompletions}
           onUpdateInput={this.props.onUpdateCategoryInput}
           onNewRequest={this.props.onNewCategoryRequest}
           searchText={this.props.categoryInput}
         />
       </ChipList>
       {/* eslint-disable react/prop-types */}
       <RaisedButton label={this.props.submitButtonLabel} primary={true} style={{margin: 12}} onClick={this.props.handleSubmit(this.props.onSubmit)}/>
       {/* eslint-enable react/prop-types */}
       <FlatButton label={this.props.secondaryButtonLabel} secondary={true} onClick={this.props.onSecondaryButtonClick} />
     </form>
    )
  }
})

export default reduxForm({
  form: 'topic-form'
})(TopicForm)
