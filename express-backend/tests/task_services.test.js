import task_services from "../models/task_model/tasks-services";
import user_services from "../models/user_model/user-services";

let task_test = null;
let test_user = null;
const date_string = toString(new Date());

test("addTask valid entry (success)", async () => {
  const user = {
    username: date_string,
    password: date_string,
  };
  let result = await user_services.addUser(user);
  test_user = result;
  const task = {
    taskName: date_string,
    priority: date_string,
    category: date_string,
    location: date_string,
    owner: result._id,
    deadline: new Date(),
  };
  result = await task_services.addTask(task);
  task_test = result;
  expect(result).not.toBe(false);
});

test("addTask invalid (failure)", async () => {
  const task = {
    taskName: "test",
    deadline: "test",
    priority: "test",
    category: "test",
    location: "test",
  };
  let result = false;
  try {
    result = await task_services.addTask(task);
  } catch (error) {
    console.log("Failed to add task");
  }
  expect(result).toBe(false);
});

test("getTasks valid entry (success)", async () => {
  const result = await task_services.getTasks();
  expect(result).not.toBe(false);
});

test("getTasks taskName (success)", async () => {
  const result = await task_services.getTasks(task_test.taskName);
  expect(result).not.toBe(false);
});

test("getTasks priority (success)", async () => {
  const result = await task_services.getTasks(undefined, task_test.priority);
  expect(result).not.toBe(false);
});

test("getTasks deadline (success)", async () => {
  const result = await task_services.getTasks(
    undefined,
    undefined,
    task_test.deadline,
  );
  expect(result).not.toBe(false);
});

test("getTasks category (success)", async () => {
  const result = await task_services.getTasks(
    undefined,
    undefined,
    undefined,
    task_test.category,
  );
  expect(result).not.toBe(false);
});

test("getTasks location (success)", async () => {
  const result = await task_services.getTasks(
    undefined,
    undefined,
    undefined,
    undefined,
    task_test.location,
  );
  expect(result).not.toBe(false);
});

test("getTasks owner (success)", async () => {
  console.log("Test Task owner", task_test.owner);
  const result = await task_services.getTasks(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    task_test.owner,
  );
  console.log(result);
  expect(result).not.toBe(false);
});

test("getTasks all (success)", async () => {
  const result = await task_services.getTasks(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );
  expect(result).not.toBe(false);
});

test("find tasks by id (success)", async () => {
  console.log("Test Task id", task_test._id);
  const id = task_test._id.toString();
  console.log("Test Task id", id);
  const result = await task_services.findTaskById(id);
  expect(result).not.toBe(null);
});

test("update task priority (success)", async () => {
  const result = await task_services.updateTask(task_test._id, {
    priority: "test",
  });
  expect(result).not.toBe(false);
});

test("update task taskName (success)", async () => {
  const result = await task_services.updateTask(null, {
    taskName: task_test.taskName,
  });
  expect(result).not.toBe(false);
});

test("deleteTasks (success)", async () => {
  const result = await task_services.deleteTask(task_test._id);
  expect(result).not.toBe(false);
});

test("find tasks by id (failure)", async () => {
  const result = await task_services.findTaskById(task_test._id);
  expect(result).toBe(null);
});

test("find tasks by id invalid id (failure)", async () => {
  const result = await task_services.findTaskById("id");
  expect(result).toBe(undefined);
});

test("deleteTasks (failure)", async () => {
  const result = await task_services.deleteTask("test");
  expect(result).toBe(false);
});

test("getTasks with no parameters (should reach line 41)", async () => {
  const result = await task_services.getTasks();
  expect(result).not.toBe(false);
});

afterAll(async () => {
  await user_services.deleteUser(test_user._id);
});
