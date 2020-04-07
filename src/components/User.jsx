import React, { useState, useEffect } from 'react';
import { Grid, Header, Segment, Form, Checkbox } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import UserService from '../services/UserService';

const User = () => {
  const usersId = useParams();
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState();

  useEffect(() => {
    UserService.findOne(usersId.id).then((res) => setUser(res));
  }, []);

  return (
    <Grid.Column width="13">
      <div style={{ margin: '2em 0' }}>
        <Header as="h2" textAlign="left">
          Edit: {user.firstName} {user.lastName}
        </Header>
      </div>
      <Segment>
        <Form>
          <Form.Input
            placeholder="Enter new first name"
            label="First name"
            type="text"
            value={firstName}
            fluid
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Input
            placeholder=" Enter new last name"
            label="last name"
            type="text"
            value={lastName}
            fluid
            onChange={(e) => setlastName(e.target.value)}
          />

          <Form.Input
            placeholder="Enter new password"
            label="Password"
            type="password"
            value={password}
            fluid
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Field
            control={Checkbox}
            label="Admin"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <Form.Button content="Save" />
        </Form>
      </Segment>
    </Grid.Column>
  );
};

export default User;
