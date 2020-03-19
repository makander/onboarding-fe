import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

const FormSimpleDropDown = ({
  placeholder, options, inputValue, onChange,
}) => (

  <Form.Field>
    <Dropdown
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={inputValue}
      clearable


    />
  </Form.Field>

);

export default FormSimpleDropDown;
