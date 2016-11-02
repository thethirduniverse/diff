import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'

import { FileInput } from 'helpers/redux_form_helpers.jsx'

const AvatarForm = React.createClass({
  propTypes: {
    onSubmitAvatarClicked: React.PropTypes.func.isRequired,
    onCancelAvatarClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,

    // from redux-form
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  errorString: function() {
    const e = this.props.errors
    if (e && e.avatar) {
      return e.avatar.toString()
    } else {
      return ''
    }
  },

  render: function() {
    const { pristine, submitting } = this.props
    return (
      <form>
        <Field name="user[avatar]" accept="image/*" component={FileInput} />
        {this.errorString()}
        <RaisedButton
          label="Submit"
          primary={true}
          style={{margin: 12}}
          disabled={pristine || submitting}
          onClick={this.props.handleSubmit(this.props.onSubmitAvatarClicked)}/>
        <FlatButton label="Cancel" onClick={this.props.onCancelAvatarClicked}/>
      </form>
    )
  }
})

export default reduxForm({
  form: 'AvatarForm'
})(AvatarForm)
