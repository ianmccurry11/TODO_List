import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { collection: "users_tasks" },
);

export default mongoose.model("Tasks", TasksSchema);
