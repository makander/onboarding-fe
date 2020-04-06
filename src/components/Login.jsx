import React, { useState, useContext } from 'react';
// import { navigate } from '@reach/router';
import { Button, Form, Segment, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UserService from '../services/UserService';

const Login = (props) => {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      .catch((err) => console.log(err));
  };
  return (
    <Grid container centered columns={1} style={{ marginTop: '7em' }}>
      <Grid.Row centered>
        <Grid.Column width="10">
          <Segment stacked>
            <Header textAlign="center">Login to Border</Header>
            <Form onSubmit={handleLogin}>
              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  placeholder="Enter password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>

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
