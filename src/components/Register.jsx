
import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Form, Segment, Header,
} from 'semantic-ui-react';


const Register = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/user/register', {
      firstName,
      lastName,
      email,
      password,
    }).then(() => {
      navigate('/');
    });
  };


  return (
    <Segment stacked>
      <Header textAlign="center">
        Signup to Border
      </Header>
      <Form onSubmit={handleRegistration}>
        <Form.Field>
          <label htmlFor="First Name">First name</label>
          <input placeholder="Enter firstname" required onChange={(e) => setFirstName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="Last Name">Last Name</label>
          <input placeholder="Enter firstname" required onChange={(e) => setLastName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="Email">Email</label>
          <input placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="Password">Password</label>
          <input placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </Segment>
  );
};


export default Register;
