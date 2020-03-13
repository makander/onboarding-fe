import React, { useEffect, useState } from 'react';
import {
  Segment, Form, Header, Button, Grid, Label,
} from 'semantic-ui-react';
import { navigate } from '@reach/router';
import DepartmentService from '../services/DepartmentService';
import UserService from '../services/UserService';
import FormInput from './forms/FormInput';
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
    });
    UserService.list().then((res) => setUsers(res.map(({ id, firstName, lastName }) => ({
      value: id,
      text: `${firstName} ${lastName}`,
    }))));
  }, []);


  const onSubmit = () => {
    const updatedDepartment = {
      name,
      description,
      users: select,
    };
    console.log(updatedDepartment);

    DepartmentService.update(departmentsId, updatedDepartment).then((res) => {
      setDep(res);
    });
    setDescription('');
    setSelect([]);
    setName('');
  };


  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    DepartmentService.destroy(departmentsId).then(() => navigate('/departments'));
  };

  return (

    <div>
      <Header>
        Update department:
        {' '}
        {dep.name}
      </Header>
      {dep.length !== null && users.length !== null ? (


        <Segment>

          {console.log(dep.Users)}
          {console.log(users)}
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
              inputValue={description}
              setInputValue={setDescription}
              name="textarea"
            />

            <FormDropDown
              placeholder="Select users"
              options={users}
              onChange={handleSelect}
              inputValue={select}
              required
              defaulltValue={select}
            />

            <br />
            <Grid centered>
              {' '}
              <Form.Group>
                <Button floated="left" type="submit">Save</Button>
                <Button floated="right" onClick={((e) => handleDelete(e))}>Delete</Button>
              </Form.Group>
            </Grid>

          </Form>
        </Segment>
      ) : null}
      {' '}
    </div>
  );
};


export default Department;
