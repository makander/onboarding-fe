import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const FormDropDown = ({
  placeholder, options, inputValue, onChange,
}) => (
  <Form.Field>

    <Dropdown
      placeholder={placeholder}
      fluid
      multiple
      // search
      selection
      value={inputValue}
      options={options}
      onChange={onChange}
      // defaultValue={[]}
      clearable
    />
  </Form.Field>
);

export default FormDropDown;
