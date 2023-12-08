import mongoose from "mongoose";

const { Schema } = mongoose;

const TasksSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      trim: false,
    },
    description: {
      type: String,
      trim: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user_tasks", // Reference to the 'user_tasks' collection
      required: false,
    },
    deadline: {
      type: Date,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users_tasks" },
);

export default mongoose.model("Tasks", TasksSchema);
