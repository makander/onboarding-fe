import React, { useState, useEffect, useContext } from 'react';
import { Grid, Header, Segment, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { dispatchMessage } = useContext(MessageContext);

  useEffect(() => {
    UserService.findAll()
      .then((res) => setUsers(res))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  }, []);

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          Users
        </Header>
      </div>
      <Segment>
        {users != null && users.length !== 0 ? (
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
        ) : (
          ''
        )}
      </Segment>
    </Grid.Column>
  );
};

export default Users;
