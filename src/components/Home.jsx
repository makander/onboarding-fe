import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Segment, Grid } from 'semantic-ui-react';
import UserService from '../services/UserService';
import Sidebar from './Sidebar';

const Home = () => {
  useEffect(() => {
    UserService.findOne().then((res) => console.log(res));
  }, []);

  return (
    <Grid.Column width={13} textAlign="center" color="orange">
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
    </Grid.Column>
  );
};

export default Home;
