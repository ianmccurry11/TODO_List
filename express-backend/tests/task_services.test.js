import task_services from "../models/tasks-services";

let task_test = null;
const date_string = "2021-05-05T00:00:00.000Z";

test("addTask valid entry (success)", async () => {
  const date_string = "2021-05-05T00:00:00.000Z";
  const task = {
    taskName: date_string,
    priority: date_string,
    category: date_string,
    location: date_string,
    deadline: new Date(),
  };
  const result = await task_services.addTask(task);
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

test("getTasks taskName not present(failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks("test");
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});
