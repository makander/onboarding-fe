import React, { useState, useContext } from 'react';
import { Button, Form, Segment, Header, Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatchMessage } = useContext(MessageContext);
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();

    UserService.loginUser({ email, password })
      .then((res) => {
        dispatch({
          type: 'LOGIN',
          payload: res.data.user,
        });

        history.push('/home');
      })
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  };
  return (
    <Grid container centered columns={1} style={{ marginTop: '7em' }}>
      <Grid.Row centered>
        <Grid.Column width="10">
          <Segment stacked>
            <Header textAlign="center">Login to Border</Header>
            <Form onSubmit={handleLogin}>
              <Form.Input
                label="Email"
                name="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Input
                label="Password"
                name="email"
                placeholder="Enter password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button fluid size="large" type="submit">
                Login
              </Button>
              <p>
                Don&apos;t have an account? Sign up&nbsp;
                <Link to="/register">here</Link>.
              </p>
            </Form>
          </Segment>
        </Grid.Column>{' '}
      </Grid.Row>
    </Grid>
  );
};

export default Login;
