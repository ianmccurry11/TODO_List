import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import HamburgerMenu from './hamburger';
import Logout from './Authentication/Logout';

export default function ButtonAppBar() {
  const { user } = useAuthContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <HamburgerMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mission Log
          </Typography>
          {!user && ( // if user is not logged in, show login button
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
          {!user && ( // if user is not logged in, show registration button
            <Button color="inherit" component={Link} to="/registration">Registration</Button>
          )}
          {user && (
            <Logout />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
