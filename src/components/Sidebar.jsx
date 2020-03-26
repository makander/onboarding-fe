import React, { Component } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Grid.Column width="3">
      <Menu vertical color="grey">
        <Menu.Item>
          <Menu.Header>Lists</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="view lists" />
            <Menu.Item name="new">
              <Link to="/lists/create">Create list</Link>
            </Menu.Item>
            <Menu.Item name="create templates" />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Deparments</Menu.Header>

          <Menu.Menu>
            <Menu.Item name="create departments" />
            <Menu.Item name="python" />
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
