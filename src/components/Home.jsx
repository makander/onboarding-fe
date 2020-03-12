import React from 'react';
import { Link } from '@reach/router';
import { Container, List, Segment } from 'semantic-ui-react';


const Home = () => (
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

export default Home;
