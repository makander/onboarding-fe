import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';
import {
  Button, Form, Segment, Header,
} from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContex';
import UserService from '../services/UserService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();


    UserService.loginUser({ email, password }).then((res) => {
      dispatch({
        type: 'LOGIN',
        payload: res.data.user,
      });

      navigate('/home');
    })
      .catch((err) => console.log(err));
  };
  return (
    <Segment stacked>
      <Header textAlign="center">
        Login to Border
      </Header>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Email</label>
          <input name="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Field>


        <Button type="submit">Login</Button>
        <p>Don&apos;t have an account? Sign up here.</p>
      </Form>
    </Segment>
  );
};


export default Login;
