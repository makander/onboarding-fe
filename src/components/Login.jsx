import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import {
  Button, Form, Segment, Header,
} from 'semantic-ui-react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3001/profile', { email, password })
      .then(() => {
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
