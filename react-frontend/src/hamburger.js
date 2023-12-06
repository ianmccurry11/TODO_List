// Import necessary components from Material-UI
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import './App.css';

// Your HamburgerMenu component
const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      <container>
        {/* Hamburger icon */}
        <IconButton onClick={toggleDrawer(true)} className="icon">
          <MenuIcon />
        </IconButton>
      </container>

      {/* Drawer */}
      <container>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {/* List of menu items */}
          <List className="toolbar-contents">
            <ListItem className="toolbar-text">
              <ListItemText>
                <Link to="/">Home</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="toolbar-text">
                <Link to="/tasks">Add & Edit Tasks</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="toolbar-text">
                <Link to="/display-tasks">Display Tasks</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className="toolbar-text">
                <Link to="/metrics">Lifetime User Metrics</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </container>
    </>
  );
};

export default HamburgerMenu;
