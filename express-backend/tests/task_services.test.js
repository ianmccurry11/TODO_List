import task_services from "../models/tasks-services";

test("addTask valid entry (success)", async () => {
  const task = {
    taskName: "test",
    priority: "test",
    category: "test",
    location: "test",
  };
  const result = await task_services.addTask(task);
  console.log(result);
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
