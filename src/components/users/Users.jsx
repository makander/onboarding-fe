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
            <Segment>
              <List>
                {users.map((user) => (
                  <List.Item key={user.id}>
                    <List.Content>
                      <p style={{ display: 'inline-block' }}>
                        {user.firstName} {user.lastName}
                      </p>
                      <Link to={`/users/${user.id}`}>
                        <Button floated="right" compact>
                          Edit
                        </Button>
                      </Link>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Segment>
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
