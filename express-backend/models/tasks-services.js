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

async function getTasks(
  taskName,
  priority,
  deadline,
  category,
  location,
  user,
) {
  // let result;
  /* Only adding search functionality for no fields or one field at a time
	Therefore, when calling this function, only search by one parameter at a time */
  console.log(taskName, priority, deadline, category, location, user);
  if (taskName !== undefined) {
    return await TaskModel.find({ taskName: taskName });
  }
  if (priority !== undefined) {
    return await TaskModel.find({ priority: priority });
  }
  if (deadline !== undefined) {
    return await TaskModel.find({ deadline: deadline });
  }
  if (category !== undefined) {
    return await TaskModel.find({ category: category });
  }
  if (user) {
    return await TaskModel.find({ owner: user });
  }
  if (location !== undefined) {
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

// update task if for all specific fields
async function updateTask(_id, updated_fields) {
  // search by description, then update
  let task_id = _id;
  if (task_id === undefined || task_id === null) {
    const query = await TaskModel.findOne(
      { taskName: updated_fields.taskName },
      "_id",
    );
    task_id = query._id;
  }
  let result = null;
  const filter = { _id: task_id };
  const update = {
    $set: updated_fields,
  };
  result = TaskModel.updateOne(filter, update);
  return result;
}

export default {
  getTasks,
  findTaskById,
  addTask,
  deleteTask,
  updateTask,
};
