
import React from 'react';

import {
  Button, Checkbox, Form, Segment, Header,
} from 'semantic-ui-react';


const Register = () => (
  <Segment stacked>
    <Header textAlign="center">
Signup to Border
    </Header>
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder="Last Name" />
      </Form.Field>
      <Form.Field>
        <label>Email:</label>
        <input placeholder="Email" />
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </Segment>
);


export default Register;
