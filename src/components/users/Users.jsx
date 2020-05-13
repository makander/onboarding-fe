import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  Header,
  Segment,
  Button,
  Loader,
  Message,
  Divider,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';
import RegisterForm from './CreateUser';
import { AuthContext } from '../../context/AuthContext';
import Notification from '../Notification';

const Users = ({ wizard }) => {
  const [users, setUsers] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    authStatus: {
      user: { email },
    },
  } = useContext(AuthContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const getUsers = await UserService.findAll();
      const filtered = getUsers.filter((usr) => usr.email !== email);
      setUsers(filtered);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ margin: '2em 0' }}>
        <Message size="huge">
          <Header as="h2" textAlign="left">
            Users
          </Header>
        </Message>
      </div>
      {wizard ? (
        <Message positive>
          <p>Please add users and then continue to next step</p>
        </Message>
      ) : (
        ''
      )}
      {!isLoading ? (
        <>
          {wizard ? <Notification /> : ''}
          <Grid.Column width="13">
            <div style={{ margin: '2em 0' }} />
            <Table simple={1}>
              {!wizard ? (
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>

                    <Table.HeaderCell>Departments</Table.HeaderCell>
                    <Table.HeaderCell width="1">{null}</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              ) : (
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              )}

              {!wizard ? (
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={uuidv4()}>
                      <Table.Cell>
                        {user.firstName} {user.lastName}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      {user.Departments.length ? (
                        user.Departments.map((dep) => (
                          <Table.Cell key={uuidv4()}>{dep.name}</Table.Cell>
                        ))
                      ) : (
                        <Table.Cell>Not assgined to a department</Table.Cell>
                      )}
                      <Table.Cell>
                        <Link to={`/users/${user.id}`}>
                          <Button floated="right" compact>
                            Edit
                          </Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              ) : (
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={uuidv4()}>
                      <Table.Cell>
                        {user.firstName} {user.lastName}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
            </Table>
            <Divider hidden />
            <Segment>
              <RegisterForm setUsers={setUsers} findAll={UserService.findAll} />
            </Segment>
          </Grid.Column>
        </>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </>
  );
};

export default Users;
