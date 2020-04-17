import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Segment, Table } from 'semantic-ui-react';
import DepartmentService from '../../services/DepartmentService';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';

const CreateDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);
  
  useEffect(() => {
    UserService.findAll().then((res) => setUsers(res));
    DepartmentService.all()
      .then((res) => {
        setDepartments(res);
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  }, []);

  const onSubmit = () => {
    const department = {
      name,
      description,
      users: select,
    };

    DepartmentService.create(department).then((res) => {
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
              <Form.Input
                placeholder="Enter department name"
                label="Department name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/*        <TextArea
                placeholder="Description"
                label="Description"
                value={description}
                setInputValue={setDescription}
                name="textarea"
              />
 */}

              <Form.Select
                placeholder="Add user to department"
                options={options}
                onChange={handleSelect}
                // value={select}
                inputValue={select}
              />
              <Form.Button title="Save" type="submit" />
            </Form>
          </Form.Group>
        </Segment>
      ) : null}{' '}
    </div>
  );
};

export default CreateDepartments;