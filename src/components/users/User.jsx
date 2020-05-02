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
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';
import { AuthContext } from '../../context/AuthContext';

const ServiceSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address'),
  password: yup.string().min(6),
});

const User = () => {
  const history = useHistory();
  const usersId = useParams();
  const [user, setUser] = useState([]);

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
  const { errors, handleSubmit, control, reset } = useForm({
    validationSchema: ServiceSchema,
    defaultValues,
  });

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
    reset(defaultValues);
  };

  const handlePassword = async (data, e) => {
    try {
      await UserService.edit(user.id, data);
      history.push('/users');
    } catch (error) {
      dispatchMessage({
        type: 'ERROR',
        payload: error.response.data,
      });

      e.target.reset();
      reset(defaultValues);
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
              <Controller
                name="firstName"
                control={control}
                label="First name"
                placeholder="enter first name"
                fluid
                as={<Form.Input />}
              />

              <Controller
                name="lastName"
                control={control}
                label="Last name"
                placeholder="Enter lastname"
                fluid
                as={<Form.Input />}
              />

              <Controller
                name="email"
                control={control}
                label="Email"
                placeholder="Enter new e-mail"
                fluid
                as={<Form.Input />}
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
              <Controller
                name="password"
                control={control}
                label="Change password"
                type="password"
                placeholder="Enter new password"
                fluid
                as={<Form.Input />}
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
