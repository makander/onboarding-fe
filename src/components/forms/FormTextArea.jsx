import React from 'react';
import { TextArea, Form, Label } from 'semantic-ui-react';

const FormTextArea = ({
  placeholder, label, name, setInputValue, inputValue,
}) => (
  <Form.Field>
    <label>{label}</label>
    <TextArea
      id={name}
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => setInputValue(e.target.value)}
    />

  </Form.Field>
);


export default FormTextArea;
