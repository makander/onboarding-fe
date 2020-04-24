import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Header,
  Segment,
  Form,
  Checkbox,
  Button,
  Message,
  Divider,
  Loader,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import { MessageContext } from '../../context/MessageContext';
import { AuthContext } from '../../context/AuthContext';

const User = ({ history }) => {
  const usersId = useParams();
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState();
  const [email, setEmail] = useState();
  const { dispatchMessage } = useContext(MessageContext);

  const { dispatch, authStatus } = useContext(AuthContext);

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

  const handleSubmit = () => {
    const data = {
      firstName: firstName !== user.firstName ? firstName : user.firstName,
      lastName: lastName !== user.lastName ? lastName : user.lastName,
      password: password !== user.password ? password : user.password,
      admin: admin !== user.admin ? admin : user.admin,
      email: email !== user.email ? email : user.email,
    };
    console.log(data);

    UserService.edit(user.id, data)
      .then(() => history.push('/users'))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
  };

  const handlePassword = () => {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      admin: user.admin,
      email: user.email,
    };

    UserService.edit(user.id, data)
      .then(() => history.push('/users'))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      });
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
            <Form onSubmit={handleSubmit}>
              <Form.Input
                placeholder="Enter new first name"
                label="First name"
                type="text"
                value={firstName}
                fluid
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Input
                placeholder=" Enter new last name"
                label="Last name"
                type="text"
                value={lastName}
                fluid
                onChange={(e) => setlastName(e.target.value)}
              />

              <Form.Input
                placeholder="Enter new e-mail"
                label="Email adress"
                type="text"
                value={email}
                fluid
                onChange={(e) => setEmail(e.target.value)}
              />

              {authStatus.user.admin ? (
                <Form.Field
                  control={Checkbox}
                  label="Admin"
                  checked={user.admin}
                  onChange={() => setAdmin(!admin)}
                />
              ) : (
                ''
              )}
              <Form.Button content="Save" />
            </Form>
          </Segment>

          <Segment>
            <Form onSubmit={handlePassword}>
              <Form.Input
                placeholder="Enter new password"
                label="Change password"
                type="password"
                value={password}
                fluid
                onChange={(e) => setPassword(e.target.value)}
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
