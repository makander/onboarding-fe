/* eslint-disable react/jsx-boolean-value */
import React, { useContext } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {
    authStatus: { user },
  } = useContext(AuthContext);

  return (
    <Grid.Row only="mobile tablet">
      <Menu top inverted style={{ width: '100%', paddingTop: '1em' }}>
        <Menu.Item as={Link} name="Home" to="/home" />

        <Menu.Item as={Link} name="Lists" to="/lists" />

        {user.admin ? (
          <>
            <Menu.Item as={Link} name="Templates" to="/templates" />
            <Menu.Item as={Link} name="Department" to="/departments" />
            <Menu.Item as={Link} name="Users" to="/users" />
          </>
        ) : (
          ''
        )}
        <Menu.Item name="">logout</Menu.Item>
      </Menu>
    </Grid.Row>
  );
};

export default Navbar;
