import mongoose from "mongoose";

const { Schema } = mongoose;

const UserMetrics = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the 'user' collection
      required: true,
    },
    user_metrics_weekly: {
      currentWeek: {
        type: Date,
        required: false,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
      required: false,
    },
    user_metrics_monthly: {
      currentMonth: {
        type: Date,
        required: false,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
      required: false,
    },
    user_metrics_yearly: {
      currentYear: {
        type: Date,
        required: false,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
      required: false,
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
  },
  { collection: "user_metrics" },
);

export default mongoose.model("UserMetrics", UserMetrics);
