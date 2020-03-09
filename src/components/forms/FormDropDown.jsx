import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const FormDropDown = ({
  placeholder, options, value, onChange,
}) => (
  <Form.Field>

    <Dropdown
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={options}
      onChange={onChange}
      defaultValue={value}
    />
  </Form.Field>
);

export default FormDropDown;
