import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';
import { AuthContext } from '../context/AuthContex';


const Navbar = () => {
  const { authStatus: { user: { id } } } = useContext(AuthContext);

  return (
    <Menu>
      {id ? (
        <Menu>
          {' '}
          <Menu.Item>
            <Link to="/home">Home</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/lists">Lists</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/logout">Logout</Link>

          </Menu.Item>
        </Menu>
      )

        : (
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
        )}
    </Menu>
  );
};


export default Navbar;
