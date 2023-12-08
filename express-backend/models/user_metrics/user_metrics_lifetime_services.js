import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "../task_model/tasks.js";
import UserMetricsModel from "./user_metrics_lifetime.js";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function get_week(date) {
  const start_date = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - start_date) / (24 * 60 * 60 * 1000));
  const week_number = Math.ceil(days / 7);
  return week_number;
}

async function update_user_metrics(task_id, date) {
  const task = await TaskModel.findOne({ _id: task_id });
  if (task === null) {
    console.log("Task not found.");
    return null;
  }
  const { owner } = task;
  const user_metrics = await UserMetricsModel.findOne({ user: owner });
  const current_date = date;
  const current_week = get_week(current_date);
  const current_month = current_date.getMonth();
  const current_year = current_date.getFullYear();
  if (user_metrics === null) {
    // Create a new user_metrics document
    const new_user_metrics = new UserMetricsModel({
      user: owner,
      tasksCompleted: 1,
      user_metrics_weekly: {
        currentWeek: current_week,
        tasksCompleted: 1,
      },
      user_metrics_monthly: {
        currentMonth: current_month,
        tasksCompleted: 1,
      },
      user_metrics_yearly: {
        currentYear: current_year,
        tasksCompleted: 1,
      },
    });
    new_user_metrics.save();
    return new_user_metrics;
  }
  // Update the user_metrics document

  // Update the tasks_completed field
  // Make sure the week,year and month match the current date
  const { user_metrics_weekly } = user_metrics;
  const { user_metrics_monthly } = user_metrics;
  const { user_metrics_yearly } = user_metrics;
  if (user_metrics_weekly.currentWeek === current_week) {
    user_metrics_weekly.tasksCompleted += 1;
  } else {
    user_metrics_weekly.currentWeek = current_week;
    user_metrics_weekly.tasksCompleted = 1;
  }
  if (user_metrics_monthly.currentMonth === current_month) {
    user_metrics_monthly.tasksCompleted += 1;
  } else {
    user_metrics_monthly.currentMonth = current_month;
    user_metrics_monthly.tasksCompleted = 1;
  }
  if (user_metrics_yearly.currentYear === current_year) {
    user_metrics_yearly.tasksCompleted += 1;
  } else {
    user_metrics_yearly.currentYear = current_year;
    user_metrics_yearly.tasksCompleted = 1;
  }
  user_metrics.tasksCompleted += 1;
  await user_metrics.save();
  return user_metrics;
}

async function get_user_metrics_lifetime(user_id) {
  console.log("user_id", user_id);
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === null) {
    return null;
  }
  return user_metrics;
}

async function get_user_metrics_weekly(user_id, date) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === null) {
    return null;
  }
  const current_date = date;
  const currentWeek = get_week(current_date);
  if (user_metrics.user_metrics_weekly.currentWeek === currentWeek) {
    return user_metrics.user_metrics_weekly.tasksCompleted;
  }
  user_metrics.user_metrics_weekly.currentWeek = currentWeek;
  user_metrics.user_metrics_weekly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}

async function get_user_metrics_monthly(user_id, date) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === null) {
    return null;
  }
  const current_date = date;
  const currentMonth = current_date.getMonth();
  if (user_metrics.user_metrics_monthly.currentMonth === currentMonth) {
    return user_metrics.user_metrics_monthly.tasksCompleted;
  }
  user_metrics.user_metrics_monthly.currentMonth = currentMonth;
  user_metrics.user_metrics_monthly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}

async function get_user_metrics_yearly(user_id, date) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === undefined || user_metrics === null) {
    return null;
  }
  const current_date = date;
  const currentYear = current_date.getFullYear();
  if (user_metrics.user_metrics_yearly.currentYear === currentYear) {
    return user_metrics.user_metrics_yearly.tasksCompleted;
  }
  user_metrics.get_user_metrics_yearly = currentYear;
  user_metrics.user_metrics_yearly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}

export default {
  update_user_metrics,
  get_user_metrics_lifetime,
  get_user_metrics_weekly,
  get_user_metrics_monthly,
  get_user_metrics_yearly,
  get_week,
};
