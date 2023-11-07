/* eslint-disable no-return-await */
/* eslint-disable object-shorthand */
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskModel from "./tasks.js";

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
  let result;
  /* Only adding search functionality for no fields or one field at a time
	Therefore, when calling this function, only search by one parameter at a time */
  if (taskName && !priority && !deadline && !category && !location) {
    return await taskModel.find({ taskName: taskName });
  }
  if (!taskName && priority && !deadline && !category && !location) {
    return await taskModel.find({ priority: priority });
  }
  if (!taskName && !priority && deadline && !category && !location) {
    return await taskModel.find({ deadline: deadline });
  }
  if (!taskName && !priority && !deadline && category && !location) {
    return await taskModel.find({ category: category });
  }
  if (!taskName && !priority && !deadline && !category && location) {
    return await taskModel.find({ location: location });
  }
  return await taskModel.find();
}

async function findTaskById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/* Current plan: finishing task-services, adding an update function,
added functionality to index.js, testing, fixing frontend so I can view if
I messed up anything, then refactoring files that are unnecesary */

async function addTask(task) {
  try {
    const taskToAdd = new taskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/* Delete functionality in the DB will be entirely by ID. Frontend
will handle deletion target task selection*/
async function deleteTask(id) {
  try {
    const result = await taskModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default {
  getTasks,
  findTaskById,
  addTask,
  deleteTask,
  //updateTask,
};
