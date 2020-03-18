import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { List, Segment } from 'semantic-ui-react';
import UserService from '../services/UserService';

const Home = () => {
  useEffect(() => {
    UserService.findOne().then((res) => console.log(res));
  }, []);

  return (
    <Segment>
      <List divided>
        <List.Item>
          <Link to="/lists">Lists</Link>
        </List.Item>
        <List.Item>
          <Link to="/departments">Departments</Link>
        </List.Item>
        <List.Item>
          <Link to="/tasks">Tasks</Link>
        </List.Item>
      </List>
    </Segment>
  );
};

export default Home;
