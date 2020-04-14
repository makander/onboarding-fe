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
      style={{ marginTop: '0.5em', minHeight: '100vh', paddingLeft: '-1rem' }}
      inverted
      fixed
    >
      <Menu.Item as={Link} name="Home" to="/home" />
      <Menu.Item as={Link} name="Lists" to="/lists" />
      {user != null && user.admin != null ? (
        <>
          <Menu.Item as={Link} name="Department" to="/departments" />
          <Menu.Item as={Link} name="Users" to="/users" />
          <Menu.Item as={Link} name="Profile" to={`/users/${user.id}`} />
        </>
      ) : (
        ''
      )}
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item onClick={handleLogout}>logout</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
