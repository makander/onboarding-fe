import React, { useEffect, useState, useContext } from 'react';
import {
  Segment,
  Form,
  Header,
  Button,
  Grid,
  Dimmer,
  Loader,
  Image,
  List,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import DepartmentService from '../../services/DepartmentService';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';

const Department = ({ history }) => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(true);
  const { dispatchMessage } = useContext(MessageContext);
  const departmentsId = useParams();

  useEffect(() => {
    DepartmentService.get(departmentsId.id)
      .then((res) => {
        setDepartments(res);
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
    UserService.findAll()
      .then((data) => setUsers(data))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
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
    DepartmentService.destroy(departmentsId.id);
    history.push('/departments');
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
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          Edit: {departments.name}
        </Header>
      </div>
      {!loader ? (
        <Grid stackable columns={16}>
          <Grid.Column width="16">
            <Segment style={{ marginTop: '2em' }}>
              <Header>Change name on department: {departments.name}</Header>
              <Grid.Row>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Input
                      placeholder="New name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <Form.Button content="Save" />
                  </Form.Group>
                </Form>
                <Form onSubmit={handleDelete}>
                  <Form.Button>Delete</Form.Button>
                </Form>
              </Grid.Row>
            </Segment>
            <Grid.Row>
              <Segment style={{ marginTop: '2em' }}>
                <Header>Users in department: </Header>
                {departments.Users !== undefined &&
                departments.Users.length !== 0 ? (
                  departments.Users.map((item) => (
                    <List divided key={item.id}>
                      <List.Item>
                        <List.Content floated="left" verticalAlign="bottom">
                          {item.firstName} {item.lastName}
                        </List.Content>
                        <List.Content verticalAlign="top">
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
                  <p>No users members in this department</p>
                )}
              </Segment>
            </Grid.Row>

            <Segment style={{ marginTop: '2em' }}>
              <Header>Add users</Header>
              <Grid.Row>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Select
                      placeholder="Add user to department"
                      options={options}
                      onChange={handleSelect}
                      value={select}
                      multiple
                      clearable
                    />

                    <Form.Button type="submit">Save</Form.Button>
                  </Form.Group>
                </Form>
              </Grid.Row>
            </Segment>
          </Grid.Column>
        </Grid>
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
