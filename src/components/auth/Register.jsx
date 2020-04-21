import React, { useState, useContext } from 'react';
import { Button, Form, Segment, Header, Grid } from 'semantic-ui-react';
import { MessageContext } from '../../context/MessageContext';
import UserService from '../../services/UserService';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const { dispatchMessage } = useContext(MessageContext);

  const handleRegistration = (e) => {
    e.preventDefault();
    UserService.registerUser({
      firstName,
      lastName,
      email,
      password,
    })
      .then(() => {
        dispatchMessage({
          type: 'SUCCESS',
          payload: 'registered',
        });
        history.push('/');
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
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
