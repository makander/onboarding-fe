import React, { useState, useEffect, useContext } from 'react';
import { useForm, ErrorMessage, Controller } from 'react-hook-form';
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Message,
  Divider,
  Loader,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';
import { AuthContext } from '../../context/AuthContext';

const ServiceSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address'),
  password: yup.string().min(6),
});

const User = ({ history }) => {
  const usersId = useParams();
  const [user, setUser] = useState([]);
  /*   const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState();
  const [email, setEmail] = useState(); */
  const { dispatchMessage } = useContext(MessageContext);

  const { authStatus } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const getUser = await UserService.findOne(usersId.id);
        setUser(getUser);
      } catch (error) {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
    email: user.email,
  };
  const { register, errors, handleSubmit, control, setValue } = useForm({
    validationSchema: ServiceSchema,
    defaultValues,
  });

  useEffect(() => {
    register({ name: 'firstName' });
    register({ name: 'lastName' });
    register({ name: 'password' });
    register({ name: 'email' });
    register({ name: 'admin' });
  }, []);

  const handleDelete = () => {
    UserService.destroy(usersId.id)
      .then(() => history.push('/users'))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  };

  const onHandleEdit = (data, e) => {
    UserService.edit(user.id, data)
      .then(() => history.push('/users'))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
    e.target.reset();
  };

  const handlePassword = async (data, e) => {
    try {
      await UserService.edit(user.id, data);
      history.push('/users');
    } catch (error) {
      /*     const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
      email: user.email,
    }; */
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });

      e.target.reset();
    }
  };

  return (
    <>
      {!isLoading ? (
        <Grid.Column width="13">
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header as="h2" textAlign="left">
                Edit: {user.firstName} {user.lastName}
              </Header>
            </Message>
          </div>

          <Header attached="top" as="h3">
            Summary:
          </Header>
          <Segment attached>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
            <p>Admin access: {user.admin ? 'Yes' : 'No'}</p>
          </Segment>
          <Divider hidden />
          <Segment>
            <Form onSubmit={handleSubmit(onHandleEdit)}>
              <Form.Input
                placeholder="Enter new first name"
                label="First name"
                type="text"
                fluid
                name="firstName"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />
              <Form.Input
                placeholder=" Enter new last name"
                label="Last name"
                type="text"
                fluid
                name="lastName"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                }}
              />

              <Form.Input
                placeholder="Enter new e-mail"
                label="Email adress"
                name="email"
                type="text"
                fluid
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
              {authStatus.user.admin ? (
                <Controller
                  name="admin"
                  control={control}
                  label="Admin"
                  defaultValue={user.admin}
                  as={Form.Checkbox}
                  valueName="checked"
                  onChange={([_, data]) => data.checked}
                />
              ) : (
                ''
              )}
              <Form.Button content="Save" />
            </Form>
          </Segment>

          <Segment>
            <Form onSubmit={handleSubmit(handlePassword)}>
              <Form.Input
                placeholder="Enter new password"
                label="Change password"
                type="password"
                name="password"
                fluid
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
              <Form.Button content="Save" />
            </Form>
          </Segment>

          <Button floated="right" negative onClick={() => handleDelete()}>
            Delete User
          </Button>
        </Grid.Column>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </>
  );
};

export default User;
