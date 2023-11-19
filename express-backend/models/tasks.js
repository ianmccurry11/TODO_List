import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: false,
    },
    deadline: {
      type: Date,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { collection: "users_tasks" },
);

export default mongoose.model("Tasks", TasksSchema);
