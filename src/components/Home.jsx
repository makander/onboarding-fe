import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, Header, Loader } from 'semantic-ui-react';
import UserService from '../services/UserService';

const Home = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    UserService.findOne().then((res) => setUser(res));
    console.log(user);
  }, []);

  return (
    <Grid.Column centered tablet={14} computer={12}>
      {user != null && user.length !== 0 ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Header float="left" textAlign="left">
              Welcome {user.firstName} {user.lastName}
            </Header>
          </div>

          <Segment>
            {user.Tasks != null && user.Tasks.length !== 0 ? (
              <>
                <Header>Tasks</Header>
                <p>You are assigned to {user.Tasks.length} tasks.</p>
                <List>
                  {user.Tasks.map((task) => (
                    <List.Item>
                      <Link to={`/lists/${task.ListId}`}>{task.name}</Link>
                    </List.Item>
                  ))}
                </List>
              </>
            ) : (
              'You are not assigned to any tasks'
            )}
          </Segment>
          <Segment>
            {user.Departments != null && user.Departments.length !== 0 ? (
              <>
                <Header>Tasks</Header>
                <p>You a member of the following departments:</p>
                <List>
                  {user.Departments.map((department) => (
                    <List.Item>{department.name}</List.Item>
                  ))}
                </List>
              </>
            ) : (
              <>
                <p>
                  Please join or create a
                  <Link to="/departments">department</Link>
                </p>
              </>
            )}
          </Segment>
        </>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </Grid.Column>
  );
};
export default Home;
