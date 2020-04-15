import React, { useEffect, useContext } from 'react';
import { Segment, Header, Button, Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';

const Start = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    UserService.refresh()
      .then((res) => {
        dispatch({
          type: 'LOGIN',
          payload: res.data.user,
        });

        history.push('/home');
      })
      .catch(() => {
        console.log('user session has expired');
      });
  }, []);

  return (
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
  );
};

export default Start;
