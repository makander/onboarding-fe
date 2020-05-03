/* eslint-disable react/jsx-boolean-value */
import React, { useContext } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';

const Navbar = () => {
  const {
    dispatch,
    authStatus: { user },
  } = useContext(AuthContext);

  const handleLogout = () => {
    UserService.logoutUser().then(() => {
      dispatch({
        type: 'LOGOUT',
      });

      // history.push('/');
    });
  };

  return (
    <Menu
      top={1}
      only="mobile tablet"
      inverted
      stackable
      style={{ width: '100%', paddingTop: '1em' }}
    >
      <Menu.Item as={Link} name="Home" to="/home" />

      <Menu.Item as={Link} name="Lists" to="/lists" />

      {user != null && user.admin ? (
        <>
          <Menu.Item as={Link} name="Department" to="/departments" />
          <Menu.Item as={Link} name="Users" to="/users" />
        </>
      ) : null}
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );
};

export default Navbar;
