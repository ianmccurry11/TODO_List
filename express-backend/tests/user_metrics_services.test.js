import user_lifetime_service from "../models/user_metrics/user_metrics_lifetime_services";
import user from "../models/user_model/user";
import user_service from "../models/user_model/user-services";
import task_service from "../models/tasks-services";
import user_metrics_lifetime from "../models/user_metrics/user_metrics_lifetime";

let test_user = null;
let test_task = null;

beforeAll(async () => {
  const field = `${Date()}user_metrics_lifetime_services.test.js`;
  const user_object = {
    username: field,
    password: field,
  };
  test_user = await user_service.addUser(user_object);
  const test_task_object = {
    title: field,
    description: field,
    owner: test_user._id,
    completed: false,
    taskName: field,
  };
  test_task = await task_service.addTask(test_task_object);
});

test("addUserLifetime", async () => {
  console.log(test_task, test_user);
  let user = false;
  user = await user_lifetime_service.update_user_metrics(test_task._id);
  expect(user).not.toBe(false);
});

afterAll(async () => {
  await user_service.deleteUser(user._id);
});
