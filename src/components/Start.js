import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Grid, Segment, Header, Button,
} from 'semantic-ui-react';


const Start = () => (
  <Grid columns={1} textAlign="center" centered>
    <Grid.Column width={6} textAlign="center">
      <Segment stacked>
        <Header size="Large">
          Welcome to Border
        </Header>
        <p>Welcome to Border the task manager for teams</p>
        <Button>Login</Button>
        {' '}
        <Button>Register</Button>
      </Segment>
    </Grid.Column>
  </Grid>

);

export default Start;
