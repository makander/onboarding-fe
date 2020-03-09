import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';
import UserService from '../services/UserService';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const [render, setRerender] = useState();

  useEffect(() => {
    UserService.listUsers().then((res) => setUsers(res));
    DepartmentService.list().then((res) => setDepartments(res)).then(console.log(departments));
  }, [render]);

  const onSubmit = () => {
    const department = {
      name,
      description,
      users: select,
    };
    console.log(department);

    DepartmentService.create(department).then((res) => console.log(res));
    setSelect([]);
    setName('');
    setDescription();
  };

  const options = users.map(({ id, firstName, lastName }) => ({ value: id, text: `${firstName} ${lastName}` }));

  const handleSelect = (e, { value }) => {
    console.log(typeof (value));
    console.log(value);
    // value.map((item) => console.log(item));
    // setSelect(value);
    setSelect({ value });
  };

  return (


    <div>

      {departments.length !== null ? (departments.map((item) => <li key={item.id}>{item.name}</li>)) : null}


      {users.length > 0 ? (
        <Form.Group>
          <Form onSubmit={onSubmit}>
            <FormInput placeholder="Department name" label="Name" type="text" inputValue={name} setInputValue={setName} />

            <TextArea placeholder="Description" label="Description" inputValue={description} setInputValue={setDescription} name="textarea" />

            <FormDropDown placeholder="Select users" options={options} onChange={handleSelect} />

            <FormButton title="Save" type="submit" />
          </Form>

        </Form.Group>
      ) : null}
      {' '}

    </div>

  );
};


export default Department;
