import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Form,
  Button,
  Segment,
  Table,
  Grid,
  Header,
  Container,
} from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import FormDropDown from './forms/FormDropDown';
import UserService from '../services/UserService';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    // UserService.findAll().then((res) => setUsers(res));
    UserService.findAll().then((res) => setUsers(res));
    DepartmentService.all().then((res) => {
      setDepartments(res);
    });
  }, []);

  const onSubmit = () => {
    console.log(departments);

    const department = {
      name,
      description,
      users: select,
    };
    console.log(department);

    DepartmentService.create(department).then((res) => {
      console.log(res.data);
      setDepartments(departments.concat([res.data]));
    });
    setSelect([]);
    setName('');
    setDescription();
  };

  const options = users.map(({ id, firstName, lastName }) => ({
    value: id,
    text: `${firstName} ${lastName}`,
  }));

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleClick = (id) => {
    DepartmentService.destroy(id);
    const filter = departments.filter((department) => department.id !== id);
    setDepartments(filter);
  };

  return (
    <Grid.Column width="10">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          Departments
        </Header>
      </div>
      {departments.length !== null ? (
        <Container>
          <Grid stackable columns={1} celled>
            {departments.map((item) => (
              <Grid.Row key={item.id} centered>
                <Grid.Column verticalAlign="middle" computer="4">
                  <Link to={`/departments/${item.id}`}>{item.name}</Link>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" computer="4">
                  {item.Users !== undefined ? item.Users.length : null}
                </Grid.Column>
                <Grid.Column verticalAlign="middle" computer="4">
                  <Button onClick={() => handleClick(item.id)}>Delete</Button>
                </Grid.Column>
                <Grid.Column verticalAlign="middle" computer="4">
                  <Button onClick={() => handleClick(item.id)}>Edit</Button>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Container>
      ) : null}
      {users.length > 0 ? (
        <Grid.Column width="10">
          <Header as="h3">Create new department</Header>
          <Segment>
            <Form.Group>
              <Form onSubmit={onSubmit}>
                <FormInput
                  placeholder="Change department name"
                  label="Name"
                  type="text"
                  inputValue={name}
                  setInputValue={setName}
                />

                {/*        <TextArea
                placeholder="Description"
                label="Description"
                value={description}
                setInputValue={setDescription}
                name="textarea"
              />
 */}

                <FormDropDown
                  placeholder="Add user to department"
                  options={options}
                  onChange={handleSelect}
                  // value={select}
                  inputValue={select}
                />
                <FormButton title="Save" type="submit" />
              </Form>
            </Form.Group>
          </Segment>
        </Grid.Column>
      ) : null}{' '}
    </Grid.Column>
  );
};

export default Department;
