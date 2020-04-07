/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid, Header, Loader } from 'semantic-ui-react';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const {
    authStatus: { user },
  } = useContext(AuthContext);

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    UserService.findOne(user.id).then((res) => setProfile(res));
  }, []);

  return (
    <Grid.Column centered tablet={14} computer={12}>
      {profile != null && profile.length !== 0 ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Header float="left" textAlign="left">
              Welcome {user.firstName} {user.lastName}
            </Header>
          </div>

          <Segment>
            {profile.Tasks != null && profile.Tasks.length !== 0 ? (
              <>
                <Header>Tasks</Header>
                <p>You are assigned to {profile.Tasks.length} tasks.</p>
                <List>
                  {profile.Tasks.map((task) => (
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
            {profile.Departments != null && user.Departments.length !== 0 ? (
              <>
                <Header>Tasks</Header>
                <p>You a member of the following departments:</p>
                <List>
                  {user.Departments.map((department) => (
                    <List.Item>{department.name}</List.Item>
                  ))}
                </List>
              </>
            ) : profile.admin ? (
              <>
                <p>
                  Please create a <Link to="/departments">department</Link> and
                  add users to it
                </p>
              </>
            ) : (
              <>
                <p>Please ask your administrator to add you to a department</p>
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
