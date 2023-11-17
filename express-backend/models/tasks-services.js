/* eslint-disable no-return-await */
/* eslint-disable object-shorthand */
import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "./tasks.js";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getTasks(taskName, priority, deadline, category, location) {
  // let result;
  /* Only adding search functionality for no fields or one field at a time
	Therefore, when calling this function, only search by one parameter at a time */
  if (taskName && !priority && !deadline && !category && !location) {
    return await TaskModel.find({ taskName: taskName });
  }
  if (!taskName && priority && !deadline && !category && !location) {
    return await TaskModel.find({ priority: priority });
  }
  if (!taskName && !priority && deadline && !category && !location) {
    return await TaskModel.find({ deadline: deadline });
  }
  if (!taskName && !priority && !deadline && category && !location) {
    return await TaskModel.find({ category: category });
  }
  if (!taskName && !priority && !deadline && !category && location) {
    return await TaskModel.find({ location: location });
  }
  return await TaskModel.find();
}

async function findTaskById(id) {
  try {
    return await TaskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/* Current plan: work on post/add task, finishing task-services, adding an update function,
added functionality to index.js, testing, fixing frontend so I can view if
I messed up anything, then refactoring files that are unnecesary */

async function addTask(task) {
  try {
    const taskToAdd = new TaskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/* Delete functionality in the DB will be entirely by ID. Frontend
will handle deletion target task selection */
async function deleteTask(_id) {
  try {
    const result = await TaskModel.findByIdAndDelete(_id);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function updateTask(id){

// }

export default {
  getTasks,
  findTaskById,
  addTask,
  deleteTask,
  // updateTask,
};
