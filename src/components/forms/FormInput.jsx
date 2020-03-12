import React from 'react';
import { Input, Form, Label } from 'semantic-ui-react';

const FormInput = ({
  placeholder, label, name, type, setInputValue, inputValue,
}) => (
  <Form.Field>

    <Form.Input
      label={label}
      id={name}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  </Form.Field>
);


export default FormInput;
