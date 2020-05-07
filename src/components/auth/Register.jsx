import React from 'react';
import { Segment, Header, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import CreateUser from '../users/CreateUser';

const Register = () => {
  const history = useHistory();

  return (
    <Grid container centered columns={1} style={{ marginTop: '7em' }}>
      <Grid.Row centered>
        <Grid.Column width="10">
          <Segment stacked>
            <Header textAlign="center">Signup to Border</Header>
            <CreateUser history={history} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
