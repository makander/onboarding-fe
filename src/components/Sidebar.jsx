import React, { Component } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';

const Sidebar = () => {
  return (
    <Grid.Column width="3">
      <Menu vertical color="grey" style={{ marginTop: '3em' }}>
        <Menu.Item>
          <Menu.Header>Lists</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="view lists">
              <Link to="/lists">View</Link>
            </Menu.Item>
            <Menu.Item name="new">
              <Link to="/lists/create">Create</Link>
            </Menu.Item>
            <Menu.Item name="new">
              <Link to="/lists/template">Create template</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Templates</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="view lists">
              <Link to="/lists/templates">View</Link>
            </Menu.Item>
            <Menu.Item name="new">
              <Link to="/lists/template">Create</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Departments</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="view lists">
              <Link to="/departments">View</Link>
            </Menu.Item>
            <Menu.Item name="view lists">
              <Link to="/lists/templates">Create</Link>
            </Menu.Item>
            <Menu.Item name="php" />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Users</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="Add users" />
            <Menu.Item name="dedicated" />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Menu>
            <Menu.Item name="">logout</Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </Grid.Column>
  );
};

export default Sidebar;
