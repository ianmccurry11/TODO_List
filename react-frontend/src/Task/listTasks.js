import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonAppBar from '../Navbar';
import rocketwoutfire from '../animationImages/newrocketwoutfire.png';
import rocketwsmoke from '../animationImages/newrocketwsmoke.png';
import rocketwfire from '../animationImages/newrocketwfire.png';
import nicemessage from '../animationImages/nice2-modified.png';

function ListTasks() {
  const [tasks, setTasks] = useState([]);

  let yeet = null; // timer for rocket fire animation
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

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:8000/tasks');
      return response.data.users_tasks;
    } catch (error) {
      // We're not handling errors. Just logging into the console.

      return false;
    }
  }

  const handleDelete = (task) => {
    axios.delete(`http://localhost:8000/tasks/${task._id}`)
      .then((res) => {
        const updatedTasks = tasks.filter((item) => item._id !== task._id);
        setTasks(updatedTasks);
      }).catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = (task) => {
    axios.put(`http://localhost:8000/tasks/${task._id}`, { completed: true })
      .then((res) => {
        const updatedTasks = tasks.filter((item) => item._id !== task._id);
        setTasks(updatedTasks);
        rocketAnimation();
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) { setTasks(result); }
    });
  }, []);

  return (
    <div>
      <ButtonAppBar />
      {/* <div id="myContainer" style={myContainerStyle}>
        <div id="myAnimation" style={myAnimationStyle}>
          <img src={imageSrc} alt="rocket" />
        </div>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Category</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.taskName}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>{task.category}</td>
              <td>{task.location}</td>
              <td>
                <button type="button" style={{ color: 'black', backgroundColor: '#1bff80' }} onClick={() => handleDelete(task)}>Delete</button>
                <button type="button" style={{ color: 'black', backgroundColor: '#1bff80' }} onClick={() => handleComplete(task)}>Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ListTasks;
