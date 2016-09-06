/* eslint-disable react/prop-types, no-unneeded-ternary */
// Copy and paste from http://redux-form.com/6.0.2/examples/material-ui/

import React from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import SelectField from 'material-ui/SelectField'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
)

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
