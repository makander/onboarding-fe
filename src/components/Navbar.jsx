import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';

const Navbar = () => (
  <Menu>
    <Menu.Item>
      <Link to="/">Border</Link>
    </Menu.Item>

    <Menu.Item>
      <Link to="/register">Register</Link>
    </Menu.Item>


    <Menu.Item>
      <Link to="/login">Login</Link>
    </Menu.Item>
  </Menu>
);


export default Navbar;
