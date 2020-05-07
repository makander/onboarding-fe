import React, { useContext, useEffect } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
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

const RegisterForm = ({ setUsers, findAll, history }) => {
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

      if (findAll) {
        const users = await findAll();
        setUsers(users);
      }

      if (history) {
        history.push('/');
      }
      e.target.reset();
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });
    }
  };

  return (
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

      <ErrorMessage as={Message} negative errors={errors} name="firstName" />
      <Form.Input
        label="Last name"
        placeholder="Enter last name"
        required
        name="lastName"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
      />
      <ErrorMessage as={Message} negative errors={errors} name="lastName" />
      <Form.Input
        label="Email"
        placeholder="Enter email"
        required
        name="email"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
      />

      <ErrorMessage as={Message} negative errors={errors} name="email" />
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

      <ErrorMessage as={Message} negative errors={errors} name="password" />

      <Button fluid size="large" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
