import user_lifetime_service from "../models/user_metrics/user_metrics_lifetime_services";
import user from "../models/user_model/user";
import user_service from "../models/user_model/user-services";
import task_service from "../models/task_model/tasks-services";

jest.setTimeout(300000);

let test_user = null;
let test_task = null;
let field = null;
let user_fields = null;
let task_fields = null;
let test_user_metrics = null;
let today = null;

beforeAll(async () => {
  today = new Date();
  field = `user_metrics_lifetime_services.test.js`;
  user_fields = {
    username: field,
    password: field,
  };
  test_user = await user_service.addUser(user_fields);
  task_fields = {
    taskName: field,
    owner: test_user._id,
  };
  test_task = await task_service.addTask(task_fields);
});

test("get week", () => {
  const date = new Date("2021-09-06");
  const week = user_lifetime_service.get_week(date);
  const expected_week = 36;
  expect(week).toBe(expected_week);
});

test("update user metrics (success)", async () => {
  const date = today;
  let result = null;
  try {
    result = await user_lifetime_service.update_user_metrics(
      test_task._id,
      date,
    );
  } catch (error) {
    console.log("Failed to update user metrics");
  }
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.user_metrics_weekly.tasksCompleted).toBe(1);
});

test("update user metrics invalid task (failure)", async () => {
  const date = today;
  let result = null;
  try {
    result = await user_lifetime_service.update_user_metrics(
      test_user._id,
      date,
    );
  } catch (error) {
    console.log("Failed to update user metrics");
  }
  expect(result).toBe(null);
});

test("update user metrics lifetime (success)", async () => {
  const result = await user_lifetime_service.update_user_metrics(
    test_task._id,
    today,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.tasksCompleted).toBeGreaterThan(1);
});

test("update user metrics lifetime next week (success)", async () => {
  const next_week = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.update_user_metrics(
    test_task._id,
    next_week,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.user_metrics_weekly.tasksCompleted).toBe(1);
});

test("update user metrics lifetime next month (success)", async () => {
  const next_month = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.update_user_metrics(
    test_task._id,
    next_month,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.user_metrics_monthly.tasksCompleted).toBe(1);
});

test("update user metrics lifetime next year (success)", async () => {
  const next_year = new Date(today.getTime() + 2*365 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.update_user_metrics(
    test_task._id,
    next_year,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.user_metrics_yearly.tasksCompleted).toBe(1);
});

test("get_user_metrics_lifetime (success)", async () => {
  const result = await user_lifetime_service.get_user_metrics_lifetime(
    test_user._id,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
  expect(result.tasksCompleted).toBeGreaterThan(1);
});

test("get_user_metrics_lifetime (failure)", async () => {
  const result = await user_lifetime_service.get_user_metrics_lifetime(
    test_task._id,
  );
  expect(result).toBe(null);
});

test("get_user_metrics_weekly (success)", async () => {
  const result = await user_lifetime_service.get_user_metrics_weekly(
    test_user._id,
    today,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_weekly (failure)", async () => {
  const result = await user_lifetime_service.get_user_metrics_weekly(
    test_task._id,
    today,
  );
  expect(result).toBe(null);
});

test("get_user_metrics_weekly next week(success)", async () => {
  const next_week = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.get_user_metrics_weekly(
    test_user._id,
    next_week,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_monthly (success)", async () => {
  const result = await user_lifetime_service.get_user_metrics_monthly(
    test_user._id,
    today,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_monthly next month (success)", async () => {
  const next_month = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.get_user_metrics_monthly(
    test_user._id,
    next_month,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_monthly (failure)", async () => {
  const result = await user_lifetime_service.get_user_metrics_monthly(
    test_task._id,
    today,
  );
  expect(result).toBe(null);
});

test("get_user_metrics_yearly (success)", async () => {
  const result = await user_lifetime_service.get_user_metrics_yearly(
    test_user._id,
    today,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_yearly next year (success)", async () => {
  const next_year = new Date(today.getTime() + 2*365 * 24 * 60 * 60 * 1000);
  const result = await user_lifetime_service.get_user_metrics_yearly(
    test_user._id,
    next_year,
  );
  expect(result).not.toBe(null);
  expect(result).not.toBe(undefined);
});

test("get_user_metrics_yearly (failure)", async () => {
  const result = await user_lifetime_service.get_user_metrics_yearly(
    test_task._id,
    today,
  );
  expect(result).toBe(null);
});

afterAll(async () => {
  await user_service.deleteUser(test_user._id);
  await task_service.deleteTask(test_task._id);
  test_task = null;
  field = null;
  user_fields = null;
  task_fields = null;
  test_user_metrics = null;
  test_user = null;
});
