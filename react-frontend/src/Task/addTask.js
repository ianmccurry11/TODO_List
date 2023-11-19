import React, { useState, useContext } from 'react';
import axios from 'axios';
import ButtonAppBar from '../Navbar';
import useAuthContext from '../hooks/useAuthContext';

function AddTask() {
  const { user } = useAuthContext();
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);

  async function handlePost(task) {
    try {
      console.log('made it to post function in addTasks');
      const response = await axios.post('http://localhost:8000/tasks', task);
      console.log(response);
      return response.data.users_tasks;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTask.id) {
          return {
            ...task,
            taskName,
            priority,
            description,
            deadline,
            category,
            location,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      handlePost({
        taskName,
        priority,
        description,
        deadline,
        category,
        location,
      });
      const newTask = {
        id: Date.now(),
        taskName,
        priority,
        description,
        deadline,
        category,
      };
      setTasks([...tasks, newTask]);
    }
    setTaskName('');
    setPriority('');
    setDescription('');
    setDeadline('');
    setCategory('');
    setLocation('');
  };

  const handleEdit = (task) => {
    setTaskName(task.taskName);
    setPriority(task.priority);
    setDescription(task.description);
    setDeadline(task.deadline);
    setCategory(task.category);
    setLocation(task.location);
    setEditingTask(task);
  };

  const handleDelete = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleComplete = (task) => {
    console.log(task);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">
          Task Name:
          <input id="taskName" type="text" value={taskName} placeholder="Insert task name" onChange={(e) => setTaskName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="priority">
          Insert Priority:
          <select value={priority} placeholder="Select priority" onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <input id="description" type="text" value={description} placeholder="Insert description" onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label htmlFor="deadline">
          Deadline:
          <input
            id="deadline"
            type="date"
            value={deadline}
            placeholder="Select a date"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="category">
          Category:
          <input id="category" type="text" value={category} placeholder="Select category" onChange={(e) => setCategory(e.target.value)} />
        </label>
        <br />
        <label htmlFor="location">
          Location:
          <input id="location" type="text" value={location} placeholder="Select location" onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
        {editingTask && <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>}
      </form>
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
                <button type="button" onClick={() => handleEdit(task)}>Edit</button>
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

export default AddTask;
