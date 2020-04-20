import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserService from '../../services/UserService';

const Sidebar = () => {
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
      vertical
      color="grey"
      style={{ minHeight: '100vh', paddingLeft: '-1rem' }}
      inverted
      fixed="left"
    >
      <Menu.Item as={Link} name="Home" to="/home" />
      <Menu.Item as={Link} name="Lists" to="/lists" />
      <Menu.Item as={Link} name="Profile" to={`/users/${user.id}`} />
      {user != null && user.admin ? (
        <>
          <Menu.Item as={Link} name="Department" to="/departments" />
          <Menu.Item as={Link} name="Users" to="/users" />
        </>
      ) : (
        ''
      )}
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
