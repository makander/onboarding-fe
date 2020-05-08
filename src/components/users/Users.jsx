import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Header,
  Segment,
  List,
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

const Users = () => {
  const [users, setUsers] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const getUsers = await UserService.findAll();
      setUsers(getUsers);
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.data,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Grid.Column width="13">
            <div style={{ margin: '2em 0' }}>
              <Message size="huge">
                <Header as="h2" textAlign="left">
                  Users
                </Header>
              </Message>
            </div>
            <Table simple>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Departments</Table.HeaderCell>
                  <Table.HeaderCell width="1" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row>
                    <Table.Cell>
                      {user.firstName} {user.lastName}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    {user.Departments.length ? (
                      user.Departments.map((dep) => (
                        <Table.Cell>{dep.name}</Table.Cell>
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
