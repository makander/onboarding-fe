import React, { useContext, useEffect } from 'react';
import {
  Button,
  Form,
  Segment,
  Header,
  Grid,
  Message,
} from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, ErrorMessage } from 'react-hook-form';
import { MessageContext } from '../../context/MessageContext';
import UserService from '../../services/UserService';

const SignupSchema = yup.object().shape({
  firstName: yup.string().min(1, 'First name is required'),
  lastName: yup.string().min(1),
  email: yup.string().email('Must be a valid email address'),
  password: yup.string().min(6),
});

const Register = ({ history }) => {
  const { dispatchMessage } = useContext(MessageContext);
  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    register({ name: 'firstName' });
    register({ name: 'lastName' });
    register({ name: 'email' });
    register({ name: 'password' });
  }, []);

  const handleRegistration = async (data, e) => {
    try {
      await UserService.registerUser(data);
      dispatchMessage({
        type: 'SUCCESS',
        payload: 'registered',
      });
      e.target.reset();
      history.push('/');
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  return (
    <Grid container centered columns={1}>
      <Grid.Row centered>
        <Grid.Column width="10">
          <Segment stacked>
            <Header textAlign="center">Signup to Border</Header>
            <Form onSubmit={handleSubmit(handleRegistration)}>
              <Form.Input
                label="First name"
                placeholder="Enter firstname"
                required
                name="firstName"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />

              <ErrorMessage
                as={Message}
                negative
                errors={errors}
                name="firstName"
              />
              <Form.Input
                label="Last name"
                placeholder="Enter last name"
                required
                name="lastName"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />
              <ErrorMessage
                as={Message}
                negative
                errors={errors}
                name="lastName"
              />
              <Form.Input
                label="Email"
                placeholder="Enter email"
                required
                name="email"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />

              <ErrorMessage
                as={Message}
                negative
                errors={errors}
                name="email"
              />
              <Form.Input
                label="Password"
                placeholder="Enter password"
                required
                type="password"
                name="password"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />

              <ErrorMessage
                as={Message}
                negative
                errors={errors}
                name="password"
              />

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
