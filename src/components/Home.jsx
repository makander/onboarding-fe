/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  Segment,
  Grid,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';

const Home = () => {
  const {
    authStatus: { user },
  } = useContext(AuthContext);
  const { dispatchMessage } = useContext(MessageContext);

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    UserService.findOne(user.id)
      .then((res) => setProfile(res))
      .catch((error) => {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response,
        });
      });
  }, []);

  return (
    <Grid.Column tablet={14} computer={12}>
      {profile != null && profile.length !== 0 ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Message>
              <Header float="left" textAlign="left">
                Welcome {user.firstName} {user.lastName}
              </Header>
            </Message>
          </div>

          <Segment>
            {profile.Tasks != null && profile.Tasks.length !== 0 ? (
              <>
                <Header>Tasks</Header>
                <p>You are assigned to {profile.Tasks.length} tasks.</p>
                <List>
                  {profile.Tasks.map((task) => (
                    <List.Item key={task.id}>
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
            {!user.admin && user.Departments.length === 0
              ? 'You are not assigned to a department, contact admin'
              : user.admin && user.Departments.length === 0
              ? 'You are not assigned to a department, please join or create one'
              : ''}

            {user.Departments != null && user.Departments.length !== 0 ? (
              <>
                <Header>Departments</Header>

                <p>You a member of the following departments:</p>
                <List>
                  {user.Departments.map((department) => (
                    <List.Item key={department.id}>{department.name}</List.Item>
                  ))}
                </List>
              </>
            ) : (
              ''
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
