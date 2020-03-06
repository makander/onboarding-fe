import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const FormDropDown = ({ placeholder, options }) => (
  <Form.Field>
    <Dropdown
      placeholder={placeholder}
      fluid
      selection
      multiple
      options={options}
    />
  </Form.Field>
);

export default FormDropDown;
