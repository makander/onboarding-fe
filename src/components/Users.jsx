import React, { useState, useEffect } from 'react';
import { Grid, Header, Segment, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.findAll().then((res) => setUsers(res));
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
                  <Button compact floated="right">
                    Delete
                  </Button>
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
