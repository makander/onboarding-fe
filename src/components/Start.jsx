import React from 'react';
import { Link } from '@reach/router';
import {
  Segment, Header, Button,
} from 'semantic-ui-react';


const Start = () => (

  <Segment stacked>
    <Header size="large">
          Welcome to Border
    </Header>
    <p>Welcome to Border the task manager for teams</p>
    <Link to="login"><Button>Login</Button></Link>

    <Link to="register"><Button>Register</Button></Link>
  </Segment>


);

export default Start;
