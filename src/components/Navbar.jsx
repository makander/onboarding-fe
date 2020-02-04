import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState({});

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });


  return (
    <Menu>
      <Menu.Item
        name="Home"
        active={activeItem === 'home'}
        content="Home"
        onClick={handleItemClick}
      />

      <Menu.Item
        name="Login"
        active={activeItem === 'Login'}
        content="Login"
        onClick={handleItemClick}
      />

      <Menu.Item
        name="Logout"
        active={activeItem === 'Logout'}
        content="Logout"
        onClick={handleItemClick}
      />
    </Menu>
  );
};


export default Navbar;
