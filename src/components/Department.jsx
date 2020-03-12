import React, { useEffect, useState } from 'react';
import { Segment, Form, Header } from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import TextArea from './forms/FormTextArea';
import FormDropDown from './forms/FormDropDown';

const Department = ({ departmentsId }) => {
  const [dep, setDep] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    DepartmentService.get(departmentsId).then((res) => {
      setDep(res);
      setUsers(res.Users.map(({ id, firstName, lastName }) => ({
        value: id,
        text: `${firstName} ${lastName}`,
      })));
    });
  }, []);


  const onSubmit = () => {
    const updatedDepartment = {
      name,
      description,
      users: select,
    };
    console.log(updatedDepartment);

    DepartmentService.update(updatedDepartment).then((res) => {
      setDep(dep.concat([res.data]));
    });
    setSelect([]);
    setName('');
    setDescription();
  };


  const handleSelect = (e, { value }) => {
    setSelect({ value });
  };

  const handleClick = (id) => {
    DepartmentService.destroy(id);
    const filter = dep.filter((item) => item.id !== id);
    setDep(filter);
  };

  return (

    <div>
      <Header>
        Update department:
        {' '}
        {dep.name}
      </Header>
      {dep.length !== null ? (


        <Segment>

          {console.log(dep.Users)}
          <Form.Group>
            <Form onSubmit={onSubmit}>
              <FormInput
                placeholder="Department name"
                label="Name"
                type="text"
                inputValue={name}
                setInputValue={setName}
              />

              <TextArea
                placeholder="Description"
                label="Description"
                value={description}
                setInputValue={setDescription}
                name="textarea"
              />

              <FormDropDown
                placeholder="Select users"
                options={users}
                onChange={handleSelect}
              />

              <FormButton title="Save" type="submit" />
            </Form>
          </Form.Group>
        </Segment>
      ) : null}
      {' '}
    </div>
  );
};


export default Department;
