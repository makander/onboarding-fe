import React, { useContext } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';
import { MessageContext } from '../../context/MessageContext';
import UserService from '../../services/UserService';

const SignupSchema = yup.object().shape({
  firstName: yup.string().required('You must enter a name'),
  lastName: yup.string().required('You must enter a last name'),
  email: yup.string().email('Must be a valid email address'),
  password: yup.string().min(6, 'Must be atleast 6 chars long'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterForm = ({ setUsers, findAll, history }) => {
  const { dispatchMessage } = useContext(MessageContext);
  const { errors, handleSubmit, control, reset } = useForm({
    validationSchema: SignupSchema,
    defaultValues,
  });

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
    e.target.reset();
    reset(defaultValues);
  };

  return (
    <Form onSubmit={handleSubmit(handleRegistration)}>
      <Controller
        as={<Form.Input />}
        control={control}
        name="firstName"
        placeholder="Enter fist name"
        label="Firstname"
      />

      <ErrorMessage as={Message} negative errors={errors} name="firstName" />
      <Controller
        as={<Form.Input />}
        control={control}
        name="lastName"
        placeholder="Enter last name"
        label="Lastname"
      />
      <ErrorMessage as={Message} negative errors={errors} name="lastName" />
      <Controller
        as={<Form.Input />}
        control={control}
        name="email"
        placeholder="Enter email"
        label="Email"
      />

      <ErrorMessage as={Message} negative errors={errors} name="email" />
      <Controller
        as={<Form.Input />}
        control={control}
        name="password"
        placeholder="Enter password"
        label="Password"
        type="password"
      />

      <ErrorMessage as={Message} negative errors={errors} name="password" />

      <Button fluid size="large" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
