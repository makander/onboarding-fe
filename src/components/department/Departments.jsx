import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Form,
  Segment,
  Grid,
  Header,
  Message,
  Divider,
} from 'semantic-ui-react';
import DepartmentService from '../../services/DepartmentService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);

  const {
    authStatus: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    UserService.findAll()
      .then((res) => setUsers(res))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
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

  // mapping out values to be used in dropdown
  const options = users.map(({ id, firstName, lastName }) => ({
    value: id,
    text: `${firstName} ${lastName}`,
  }));

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  /*   const handleClick = (id) => {
    DepartmentService.destroy(id);
    const filter = departments.filter((department) => department.id !== id);
    setDepartments(filter);
  }; */

  return (
    <>
      {user.admin ? (
        <Grid.Column width="13">
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header as="h2" textAlign="left">
                Departments
              </Header>
            </Message>
          </div>
          <Segment attached>
            {departments !== null && departments.length !== 0 ? (
              <Grid stackable columns={13} textAlign="left">
                {departments.map((item) => (
                  <Grid.Row key={item.id} centered>
                    <Grid.Column verticalAlign="middle" computer="4">
                      <Link to={`/departments/${item.id}`}>{item.name}</Link>
                    </Grid.Column>
                    <Grid.Column
                      floated="right"
                      verticalAlign="middle"
                      computer="4"
                    >
                      {item.Users !== undefined ? (
                        <p>Members: {item.Users.length}</p>
                      ) : null}
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </Grid>
            ) : (
              <p>No departments available, please create one below</p>
            )}
          </Segment>
          <Divider hidden />
          {users.length > 0 ? (
            <Grid.Column width="13">
              <Header as="h3" attached="top">
                Create new department
              </Header>
              <Segment attached>
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
                      label="Add users"
                      placeholder="Add user to department"
                      options={options}
                      onChange={handleSelect}
                      value={select}
                      multiple
                      clearable
                    />
                    <Form.Button type="submit">Save</Form.Button>
                  </Form>
                </Form.Group>
              </Segment>
            </Grid.Column>
          ) : null}{' '}
        </Grid.Column>
      ) : (
        'Not authorized'
      )}
    </>
  );
};

export default Department;
