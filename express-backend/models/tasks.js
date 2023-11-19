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
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user_tasks", // Reference to the 'user_tasks' collection
      required: true,
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
