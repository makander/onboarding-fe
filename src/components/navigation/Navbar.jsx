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
    <Grid.Row only="mobile tablet">
      <Menu top={1} inverted style={{ width: '100%', paddingTop: '1em' }}>
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
    </Grid.Row>
  );
};

export default Navbar;
