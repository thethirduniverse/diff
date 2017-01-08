/* eslint-disable react/prop-types, no-unneeded-ternary */
// Copy and paste from http://redux-form.com/6.0.2/examples/material-ui/

import Checkbox from 'material-ui/Checkbox'
import React from 'react'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import { RadioButtonGroup } from 'material-ui/RadioButton'

export const renderTextField = ({ input, label, meta: { touched, error }, errorText, ...custom }) => {
  return <TextField hintText={label}
      floatingLabelText={label}
      errorText={touched ? (error ? error : errorText) : null}
      {...input}
      {...custom}
    />
}

export const renderCheckbox = ({ input, label }) => (
    <Checkbox label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}/>
)

export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}/>
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}/>
)

// https://github.com/erikras/redux-form/issues/71
export class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { accept } = this.props
    return (<input
      type="file"
      accept={accept}
      onChange={this.onChange}
    />)
  }
}
