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
import './App.css';
import rocketwoutfire from './animationImages/rocketwoutfire2.png';

export default function ButtonAppBar() {
  const { user } = useAuthContext();
  const myContainerStyle = {
    width: '70%',
    height: '50px',
    position: 'relative',
    background: 'green',
    marginLeft: '20px',
    marginRight: 'auto',
  };
  const myAnimationStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    // background: 'red',
    textAlign: 'left'
  };
  return (
    <div className="navbar">
      <AppBar position="static" className="navbar-content">
        <Toolbar style={{ justifyContent: 'flex-start' }}>
          <HamburgerMenu className="hamburger" />
          <Typography variant="h6" component="div" className="navbar-text">
            Mission Log
          </Typography>


          <div id="myContainer" style={myContainerStyle}>
            <div id="myAnimation" style={myAnimationStyle}>
              <img src={rocketwoutfire} alt="rocket" />
            </div>
          </div>

          {!user && ( // if user is not logged in, show login button
          <Button component={Link} to="/login" className="login-text">Login</Button>
          )}
          {!user && ( // if user is not logged in, show registration button
          <Button component={Link} to="/registration" className="reg-text">Registration</Button>
          )}
          {user && (
          <Logout />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
