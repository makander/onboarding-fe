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
    <>
      {id ? (
        <Menu fixed="top">
          {' '}
          <Menu.Item>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/lists">Lists</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/task">Tasks</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu fixed="top">
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
      )}
    </>
  );
};

export default Navbar;
