import React from 'react';
import { Segment, Header, Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Start = () => (
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

export default Start;
