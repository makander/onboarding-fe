import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Segment, Header, Grid } from 'semantic-ui-react';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post('/api/user/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        history.push('/');
      });
  };

  return (
    <Grid container centered columns={1}>
      <Grid.Row centered>
        <Grid.Column width="10">
          <Segment stacked>
            <Header textAlign="center">Signup to Border</Header>
            <Form onSubmit={handleRegistration}>
              <Form.Field>
                <label htmlFor="First Name">First name</label>
                <input
                  placeholder="Enter firstname"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="Last Name">Last Name</label>
                <input
                  placeholder="Enter firstname"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="Email">Email</label>
                <input
                  placeholder="Enter Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="Password">Password</label>
                <input
                  placeholder="Enter Password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>

              <Button fluid size="large" type="submit">
                Submit
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
