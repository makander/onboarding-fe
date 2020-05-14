import React, { useEffect, useContext } from 'react';
import { Segment, Header, Button, Grid, Loader } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';

const Start = () => {
  const { authStatus } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const refresh = async () => {
    try {
      const user = await UserService.refresh();
      dispatch({
        type: 'LOGIN',
        payload: user.data.usr,
      });
      history.push('/home');
    } catch (e) {}
  };

  useEffect(() => {
    refresh();
  }, []);

  /*     UserService.refresh()
        .then((res) => {
          dispatch({
            type: 'LOGIN',
            payload: res.data.usr,
          });
  
          history.push('/home');
        })
        .catch(() => {} */
  return (
    <div>
      {!authStatus.isUserAuthenticated ? (
        <Grid container centered columns={1} style={{ marginTop: '7em' }}>
          <Grid.Row centered>
            <Grid.Column width={10} textAlign="center">
              <Segment stacked>
                <Header size="large">Welcome to Border</Header>
                <p>Welcome to Border the task manager for teams</p>
                <Link to="login">
                  <Button>Login</Button>
                </Link>

                <Link to="register">
                  <Button>Register</Button>
                </Link>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Start;
