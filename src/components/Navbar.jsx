import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContex';

const Navbar = () => {
  const {
    authStatus: {
      user: { id },
    },
  } = useContext(AuthContext);

  return (
    <Menu top inverted style={{ width: '100%', paddingTop: '1em' }}>
      <Menu.Item as={Link} name="Lists" to="/lists" />

      <Menu.Item as={Link} name="Templates" to="/templates" />
      <Menu.Item as={Link} name="Department" to="/departments" />
      <Menu.Item name="">logout</Menu.Item>
    </Menu>
  );
};

export default Navbar;
