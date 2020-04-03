import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Menu
      vertical
      color="grey"
      style={{ marginTop: '0.5em', minHeight: '100vh', paddingLeft: '-1rem' }}
      inverted
      fixed
    >
      <Menu.Item as={Link} name="Lists" to="/lists" />

      <Menu.Item as={Link} name="Templates" to="/templates" />
      <Menu.Item as={Link} name="Department" to="/departments" />

      <Menu.Item>
        <Menu.Menu>
          <Menu.Item name="">logout</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
