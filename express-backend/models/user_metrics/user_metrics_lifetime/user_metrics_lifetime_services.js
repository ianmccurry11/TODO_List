import UserMetricsLifetime from "./user_metrics_lifetime";
import User from "../../user_model/user";

async function updateUserMetrics(user_id, callback) {
  const user_metrics = await UserMetricsLifetime.findOne({ user: user_id });
  if (!user_metrics) {
    const user = await User.findById(user_id);
    const new_user_metrics = new UserMetricsLifetime({
      user: user_id,
      user_metrics_weekly: {
        currentWeek: new Date(),
        tasksCompleted: 0,
      },
      user_metrics_monthly: {
        currentMonth: new Date(),
        tasksCompleted: 0,
      },
      user_metrics_yearly: {
        currentYear: new Date(),
        tasksCompleted: 0,
      },
      tasksCompleted: 0,
    });
    new_user_metrics.save();
    user.user_metrics = new_user_metrics._id;
    user.save();
  }
  user_metrics.tasksCompleted += 1;
  const current_date = new Date();
  if (
    current_date.getMonth() !==
    user_metrics.user_metrics_monthly.currentMonth.getMonth()
  ) {
    user_metrics.user_metrics_monthly.currentMonth = current_date;
    user_metrics.user_metrics_monthly.tasksCompleted = 0;
  }
  if (
    current_date.getFullYear() !==
    user_metrics.user_metrics_yearly.currentYear.getFullYear()
  ) {
    user_metrics.user_metrics_yearly.currentYear = current_date;
    user_metrics.user_metrics_yearly.tasksCompleted = 0;
  }
  user_metrics.save();
  callback();
}

export default {
  updateUserMetrics,
};
