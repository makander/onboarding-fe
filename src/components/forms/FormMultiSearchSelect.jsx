import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const FormMultiSearchSelect = ({
  options, placeholder, onChange, value,
}) => {
  <Dropdown
    placeholder={placeholder}
    fluid
    multiple
    search
    selection
    options={options}
    onChange={onChange}
    value={value}
  />;
};

export default FormMultiSearchSelect;
