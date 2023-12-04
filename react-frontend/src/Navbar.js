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
// let shake = null; // timer for rocket smoke animation

export default function ButtonAppBar() {
  const { user } = useAuthContext();
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
    textAlign: 'left'
  };

  const [imageSrc, setImageSrc] = React.useState(rocketwoutfire); // set image to rocketwoutfire

  // const changeImage = () => {
  //   setImageSrc(rocketwfire);
  //   if (imageSrc === rocketwfire) {
  //     rocketAnimation();
  //   }
  // }; //[imageSrc]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const rocketAnimation = async (e) => {
    e.preventDefault();
    /* Current plan: call rocketAnimation on click and initiate entire animation from single click.
    */

    let pos = 0;
    clearInterval(yeet);
    // clearInterval(shake);
    
    setImageSrc(rocketwsmoke); // set image to rocketwsmoke
    await delay(500); // wait 1 seconds

    // for (let i = 0; i < 10; i += 1) {
    //   shake = setInterval(rattle, 10); // runs the frame function every 10 milliseconds
    //   function rattle() {
    //     if (pos === 50) {
    //       clearInterval(rattle);
    //       // elem.style.top = '0px'; // reset position
    //       elem.style.left = '0px'; // reset position
    //       // setImageSrc(rocketwsmoke); // set image to rocketwfire
    //     } else {
    //       pos += 2;
    //       // elem.style.top = pos + 'px';
    //       elem.style.left = pos + 'px';
    //     }
    //   }
    //   }
    setImageSrc(rocketwfire); // set image to rocketwfire
    // await delay(1000); // wait 5 seconds
    // if (imageSrc === rocketwfire) {
      const elem = document.getElementById('myAnimation');
      
      yeet = setInterval(frame, 10); // runs the frame function every 10 milliseconds
      function frame() {
        if (pos === 950) {
          clearInterval(yeet);
          // elem.style.top = '0px'; // reset position
          elem.style.left = '0px'; // reset position
          setImageSrc(rocketwoutfire); // set image to rocketwfire
        } else {
            if (pos == 700) {
              setImageSrc(nicemessage); // set image to nicemessage
            }
          pos += 5;
          // elem.style.top = pos + 'px';
          elem.style.left = pos + 'px';
        }
      }

    // } // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 3 5 1
  };

  // React.useEffect(() => {
  //   // setImageSrc(rocketwfire); // set image to rocketwfire
  //   if (imageSrc === rocketwfire) {
  //     rocketAnimation();
  //   }
  // }, [imageSrc]);

  return (
    <div className="navbar">
      <AppBar position="static" className="navbar-content">
        <Toolbar style={{ justifyContent: 'flex-start' }}>
          <HamburgerMenu className="hamburger" />
          <Typography variant="h6" component="div" className="navbar-text">
            Mission Log
          </Typography>

          <Button onClick={rocketAnimation}> NICE! :) </Button>

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
