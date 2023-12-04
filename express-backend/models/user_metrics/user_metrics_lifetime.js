import mongoose from "mongoose";

const { Schema } = mongoose;

const UserMetricsSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the 'user' collection
      required: true,
    },
    user_metrics_weekly: {
      currentWeek: {
        type: Number,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
    },
    user_metrics_monthly: {
      currentMonth: {
        type: Number,
      },
      tasksCompleted: {
        type: Number,
      },
    },
    user_metrics_yearly: {
      currentYear: {
        type: Number,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
  },
  { collection: "user_metrics" },
);

export default mongoose.model("UserMetrics", UserMetricsSchema);
