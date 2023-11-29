import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../user_model/user.js";
import TaskModel from "../tasks.js";
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

function getWeek(date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

export default async function update_user_metrics(task_id) {
  const task = await TaskModel.findOne({ _id: task_id });
  if (task === undefined || task === null) {
    console.log("Task not found.");
    return;
  }
  const { owner } = task;
  const user_metrics = await UserMetricsModel.findOne({ user: owner });
  const current_date = new Date();
  const currentWeek = getWeek(current_date);
  const currentMonth = current_date.getMonth();
  const currentYear = current_date.getFullYear();
  if (user_metrics === undefined || user_metrics === null) {
    // Create a new user_metrics document
    const new_user_metrics = new UserMetricsModel({
      user: owner,
      tasks_completed: 1,
      user_metrics_weekly: {
        currentWeek,
        tasksCompleted: 1,
      },
      user_metrics_monthly: {
        currentMonth,
        tasksCompleted: 1,
      },
      user_metrics_yearly: {
        currentYear,
        tasksCompleted: 1,
      },
    });
    new_user_metrics.save();
  }
  // Update the user_metrics document
  else {
    // Update the tasks_completed field
    // Make sure the week,year and month match the current date
    const { user_metrics_weekly } = user_metrics;
    const { user_metrics_monthly } = user_metrics;
    const { user_metrics_yearly } = user_metrics;
    if (user_metrics_weekly.current_week === currentWeek) {
      user_metrics_weekly.tasks_completed += 1;
    } else {
      user_metrics_weekly.current_week = currentWeek;
      user_metrics_weekly.tasksCompleted = 1;
    }
    if (user_metrics_monthly.current_month === currentMonth) {
      user_metrics_monthly.tasksCompleted += 1;
    } else {
      user_metrics_monthly.currentMonth = currentMonth;
      user_metrics_monthly.tasksCompleted = 1;
    }
    if (user_metrics_yearly.currentYear === currentYear) {
      user_metrics_yearly.tasksCompleted += 1;
    } else {
      user_metrics_yearly.currentYear = currentYear;
      user_metrics_yearly.tasksCompleted = 1;
    }
    user_metrics.tasks_completed += 1;
    await user_metrics.save();
  }
}

export async function get_user_metrics_lifetime(user_id) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === undefined || user_metrics === null) {
    return null;
  }
  return user_metrics.tasksCompleted;
}

export async function get_user_metrics_weekly(user_id) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === undefined || user_metrics === null) {
    return null;
  }
  const current_date = new Date();
  const currentWeek = getWeek(current_date);
  if (user_metrics.user_metrics_weekly.currentWeek === currentWeek) {
    return user_metrics.user_metrics_weekly.tasksCompleted;
  }
  user_metrics.user_metrics_weekly.currentWeek = currentWeek;
  user_metrics.user_metrics_weekly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}

export async function get_user_metrics_monthly(user_id) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === undefined || user_metrics === null) {
    return null;
  }
  const current_date = new Date();
  const currentMonth = current_date.getMonth();
  if (user_metrics.user_metrics_monthly.currentMonth === currentMonth) {
    return user_metrics.user_metrics_monthly.tasksCompleted;
  }
  user_metrics.user_metrics_monthly.currentMonth = currentMonth;
  user_metrics.user_metrics_monthly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}

export async function get_user_metrics_yearly(user_id) {
  const user_metrics = await UserMetricsModel.findOne({ user: user_id });
  if (user_metrics === undefined || user_metrics === null) {
    return null;
  }
  const current_date = new Date();
  const currentYear = current_date.getFullYear();
  if (user_metrics.user_metrics_yearly.currentYear === currentYear) {
    return user_metrics.user_metrics_yearly.tasksCompleted;
  }
  user_metrics.get_user_metrics_yearly = currentYear;
  user_metrics.user_metrics_yearly.tasksCompleted = 0;
  await user_metrics.save();
  return user_metrics.tasksCompleted;
}
