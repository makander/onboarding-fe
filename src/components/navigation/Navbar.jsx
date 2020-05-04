import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';

const Navbar = () => {
  const history = useHistory();

  const {
    dispatch,
    authStatus: { user },
  } = useContext(AuthContext);

  const handleLogout = () => {
    UserService.logoutUser().then(() => {
      dispatch({
        type: 'LOGOUT',
      });

      history.push('/');
    });
  };

  return (
    <Menu
      style={{ textShadow: 'textshadow 0  1px rgba(0,0,0,.3)' }}
      stackable
      color="grey"
      inverted
      size="large"
      attached
    >
      <Menu.Menu position="left">
        <Menu.Item as={Link} name="Home" to="/home" />
        <Menu.Item as={Link} name="Lists" to="/lists" />
        <Menu.Item as={Link} name="Profile" to={`/users/${user.id}`} />
        {user != null && user.admin ? (
          <>
            <Menu.Item as={Link} name="Department" to="/departments" />
            <Menu.Item as={Link} name="Users" to="/users" />
            <Menu.Item as={Link} name="Notifications" to="/notifications" />
          </>
        ) : (
          ''
        )}
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
