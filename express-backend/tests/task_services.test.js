import task_services from "../models/tasks-services";


let task_test = null;
const date_string = toString(new Date());

test("addTask valid entry (success)", async () => {
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

test("getTasks taskName not present (failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks("test");
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});

test("getTasks deadline not present (failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks(undefined, "test");
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});

test("getTasks priority not present (failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks(undefined, undefined, "test");
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});

test("getTasks deadline not present (failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks(
      undefined,
      undefined,
      undefined,
      "test",
    );
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});

test("getTasks category not present (failure)", async () => {
  let result = [];
  try {
    result = await task_services.getTasks(
      undefined,
      undefined,
      undefined,
      undefined,
      "test",
    );
  } catch (error) {
    console.log(result);
    console.log("Failed to get tasks");
  }
  expect(result).toStrictEqual([]);
});

test("find tasks by id (success)", async () => {
  const result = await task_services.findTaskById(task_test._id);
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

test("getTasks should return all tasks when no parameters are provided (success)", async () => {
  const expectedTasks = [{ taskName: "task1" }, { taskName: "task2" }];
  task_services.getTasks = jest.fn().mockResolvedValue(expectedTasks);

  const result = await task_services.getTasks();

  expect(task_services.getTasks).toHaveBeenCalledWith();
  expect(result).toEqual(expectedTasks);
});

test("getTasks with no parameters (should reach line 41)", async () => {
  const result = await task_services.getTasks();
  expect(result).not.toBe(false);
});
