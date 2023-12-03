// Import necessary components from Material-UI
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

// Your HamburgerMenu component
const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      {/* Hamburger icon */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {/* List of menu items */}
        <List>
          <ListItem>
            <ListItemText>
              <Link to="/">Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/registration">Registration</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/tasks">Tasks</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/display-tasks">Display Tasks</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link to="/metrics">Lifetime User Metrics</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
