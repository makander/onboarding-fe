import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Menu
      vertical
      color="grey"
      style={{ marginTop: '0.5em', minHeight: '100vh', paddingLeft: '-1rem' }}
      inverted
    >
      <Dropdown item text="Lists">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} name="View" to="/lists">
            View
          </Dropdown.Item>

          <Dropdown.Item as={Link} name="Create" to="/lists/create">
            Create
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item text="Templates">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} name="View" to="/templates">
            View
          </Dropdown.Item>

          <Dropdown.Item as={Link} name="Create" to="/templates/create">
            Create
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item text="Departments">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} name="View" to="/departments">
            View
          </Dropdown.Item>

          <Dropdown.Item as={Link} name="Create" to="/departments/create">
            Create
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item text="Users">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} name="View" to="/departments">
            View
          </Dropdown.Item>

          <Dropdown.Item as={Link} name="Create" to="/departments/create">
            Create
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item>
        <Menu.Menu>
          <Menu.Item name="">logout</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
