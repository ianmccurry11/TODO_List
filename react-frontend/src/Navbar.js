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
import rocketwoutfire from './animationImages/newrocketwoutfire.png';
import rocketwsmoke from './animationImages/newrocketwsmoke.png';
import rocketwfire from './animationImages/newrocketwfire.png';
import nicemessage from './animationImages/nice2-modified.png';

let yeet = null; // timer for rocket fire animation

export default function ButtonAppBar() {
  const { user } = useAuthContext();

  // Container background styling for container and animation itself
  const myContainerStyle = {
    width: '70%',
    height: '50px',
    position: 'relative',
    background: 'black',
    marginLeft: '20px',
    marginRight: 'auto',
  };
  const myAnimationStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    textAlign: 'left',
  };

  const [imageSrc, setImageSrc] = React.useState(rocketwoutfire); // set image to rocketwoutfire

  const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // create delay function

  const rocketAnimation = async (e) => {
    e.preventDefault(); // prof suggestion to prevent locking of events
    let pos = 0;
    clearInterval(yeet);
    setImageSrc(rocketwsmoke); // set image to rocketwsmoke
    await delay(500); // wait .5 seconds
    setImageSrc(rocketwfire); // set image to rocketwfire
    const elem = document.getElementById('myAnimation');
    function frame() {
      if (pos === 950) {
        clearInterval(yeet);
        elem.style.left = '0px'; // reset position
        setImageSrc(rocketwoutfire); // set image to rocketwfire
      } else {
        if (pos === 700) {
          setImageSrc(nicemessage); // set image to nicemessage
        }
        pos += 5;
        // elem.style.top = pos + 'px';
        elem.style.left = `${pos}px`;
      }
    }
    yeet = setInterval(frame, 10); // runs the frame function every 10 milliseconds
  };

  return (
    // { rocketAnimation }
    <div className="navbar">
      <AppBar position="static" className="navbar-content">
        <Toolbar style={{ justifyContent: 'flex-start' }}>
          <HamburgerMenu className="hamburger" />
          <Typography variant="h6" component="div" className="navbar-text">
            Mission Log
          </Typography>
          <Button onClick={rocketAnimation}>  </Button>
          <div id="myContainer" style={myContainerStyle}>
            <div id="myAnimation" style={myAnimationStyle}>
              <img src={imageSrc} alt="rocket" />
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
// export { rocketAnimation };
