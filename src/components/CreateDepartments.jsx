import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button, Segment, Table } from 'semantic-ui-react';
import DepartmentService from '../services/DepartmentService';
import FormInput from './forms/FormInput';
import FormButton from './forms/FormButton';
import FormDropDown from './forms/FormDropDown';
import UserService from '../services/UserService';

const CreateDepartments = () => {
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
    <div>
      {departments.length !== null ? (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Departments</Table.HeaderCell>
              <Table.HeaderCell>Members</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {departments.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Link to={`${item.id}`}>{item.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  {item.Users !== undefined ? item.Users.length : null}
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleClick(item.id)}>Delete</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleClick(item.id)}>Edit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
      {users.length > 0 ? (
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
      ) : null}{' '}
    </div>
  );
};

export default CreateDepartments;
