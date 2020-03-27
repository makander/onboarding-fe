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
    <Menu vertical color="grey" style={{ marginTop: '0.5em' }}>
      <Menu.Item>
        <Menu.Header>Lists</Menu.Header>

        <Menu.Menu>
          <Menu.Item name="view lists">
            <Link to="/lists">View</Link>
          </Menu.Item>
          <Menu.Item name="new">
            <Link to="/lists/create">Create</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Templates</Menu.Header>

        <Menu.Menu>
          <Menu.Item name="view lists">
            <Link to="/templates">View</Link>
          </Menu.Item>
          <Menu.Item name="new">
            <Link to="/template">Create</Link>
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
  );
};

export default Sidebar;
