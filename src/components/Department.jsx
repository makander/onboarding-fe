import React, { useEffect, useState } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Grid,
  Dimmer,
  Loader,
  Image,
  Container,
  List,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
// import { navigate } from '@reach/router';
import DepartmentService from '../services/DepartmentService';
import UserService from '../services/UserService';

const Department = ({ history }) => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState('');
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(true);

  const departmentsId = useParams();

  useEffect(() => {
    DepartmentService.get(departmentsId.id).then((res) => {
      setDepartments(res);
    });
    UserService.findAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const opts = users.filter(
      (entry1) =>
        departments.Users &&
        !departments.Users.some((entry2) => entry1.id === entry2.id)
    );
    const filterOptions = opts.map(({ id, firstName, lastName }) => ({
      value: id,
      text: `${firstName} ${lastName}`,
    }));
    setOptions(filterOptions);
    setLoader(false);
  }, [users, departments]);

  const onSubmit = () => {
    if (name === '' && select.length === 0) {
      const updatedDepartment = {
        name: departments.name,
        users: departments.Users,
      };
      DepartmentService.update(departmentsId.id, updatedDepartment).then(
        (res) => {
          setDepartments(res);
        }
      );
    } else {
      const data = {
        name,
        users: select,
      };

      DepartmentService.update(departmentsId.id, data).then((res) => {
        setDepartments(res);
      });
    }
    setSelect([]);
    setName('');
  };

  const handleSelect = (e, { value }) => {
    setSelect(value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    DepartmentService.destroy(departmentsId.id).then(() =>
      history.push('/departments')
    );
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    DepartmentService.removeUser(departmentsId.id, { UserId: id }).then(
      (res) => {
        setDepartments(res);
      }
    );
  };

  return (
    <Grid.Column width="12">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          Edit: {departments.name}
        </Header>
      </div>
      {!loader ? (
        <Container>
          <Grid stackable columns={1}>
            <Grid.Column width="12">
              <Segment style={{ marginTop: '2em' }}>
                <Grid.Row>
                  <Grid.Column width="10">
                    <Form onSubmit={onSubmit} inline>
                      <Form.Group>
                        <Form.Input
                          placeholder="New name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          width="12"
                        />
                        <br />
                        <Form.Button content="Submit" />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Segment>
              <Grid.Row>
                <Segment style={{ marginTop: '2em' }}>
                  {departments.Users !== undefined &&
                  departments.Users.length !== 0 ? (
                    departments.Users.map((item) => (
                      <List divided>
                        <List.Item key={item.id}>
                          <List.Content floated="left" verticalAlign="bottom">
                            {item.firstName} {item.lastName}
                          </List.Content>
                          <List.Content floated="right" verticalAlign="top">
                            <Button
                              compact
                              onClick={(e) => handleClick(e, item.id)}
                            >
                              Remove
                            </Button>
                          </List.Content>
                        </List.Item>
                      </List>
                    ))
                  ) : (
                    <Grid.Column verticalAlign="middle" width="10">
                      No users members in this department
                    </Grid.Column>
                  )}
                </Segment>
              </Grid.Row>

              <Segment style={{ marginTop: '2em' }}>
                <Grid.Row>
                  <Grid.Column width="10">
                    <Form onSubmit={onSubmit}>
                      <Form.Group>
                        <Form.Select
                          placeholder="Add user to department"
                          options={options}
                          onChange={handleSelect}
                          value={select}
                          multiple
                          clearable
                          width="14"
                          label="Users"
                        />

                        <Button float="right" type="submit">
                          Save
                        </Button>
                      </Form.Group>
                    </Form>
                  </Grid.Column>

                  {/* 
                <Button type="submit">Save</Button>

                <Button onClick={(e) => handleDelete(e)}>Delete</Button> */}
                </Grid.Row>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      ) : (
        <Segment>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      )}
    </Grid.Column>
  );
};

export default Department;
