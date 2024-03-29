import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'

import { renderTextField, FileInput } from 'helpers/redux_form_helpers.jsx'

const ProfileForm = React.createClass({
  propTypes: {
    onSubmitClicked: React.PropTypes.func.isRequired,
    onCancelClicked: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,

    // from redux-form
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  },

  avatarError: function() {
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
        {this.avatarError()}

        <br></br>
        <Field name="user[first_name]" label="First Name" type="text" fullWidth={false} multiLine={false} errorText={this.props.errors.first_name} component={renderTextField} />
        <Field name="user[last_name]" label="Last Name" type="text" fullWidth={false} multiLine={false} errorText={this.props.errors.last_name} component={renderTextField} />
        <Field name="user[bio]" label="Short Bio" type="text" fullWidth={true} multiLine={true} errorText={this.props.errors.name} component={renderTextField} />
        <RaisedButton
          label="Submit"
          primary={true}
          style={{margin: 12}}
          disabled={pristine || submitting}
          onClick={this.props.handleSubmit(this.props.onSubmitClicked)}/>
        <FlatButton label="Cancel" onClick={this.props.onCancelClicked}/>
      </form>
    )
  }
})

export default reduxForm({
  form: 'ProfileForm'
})(ProfileForm)
