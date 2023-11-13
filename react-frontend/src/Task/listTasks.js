import { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonAppBar from '../Navbar';

function ListTasks() {
  const [tasks, setTasks] = useState([]);

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:8000/tasks');
      console.log(response);
      return response.data.users_tasks;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  const handleDelete = (task) => {
  };

  const handleComplete = (task) => {

  };

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) { setTasks(result); }
    });
  }, []);

  return (
    <div>
      hello
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
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>{task.deadline}</td>
              <td>{task.category}</td>
              <td>{task.location}</td>
              <td>
                <button type="button" onClick={() => handleDelete(task)}>Delete</button>
                <button type="button" onClick={() => handleComplete(task)}>Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ListTasks;
