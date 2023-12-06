import user_services from "../models/user_model/user-services";

const field = Date();
let test_user = null;
test("addUser valid entry (success)", async () => {
  console.log(field);
  const user = {
    username: field,
    password: field,
  };
  let result = false;
  try {
    result = await user_services.addUser(user);
    test_user = result;
  } catch (error) {
    console.log("Failed to add user");
  }
  expect(result).not.toBe(false);
});

test("addUser invalid entry (failure)", async () => {
  const user = {
    username: 12345,
    password: 12345,
  };
  let result = false;
  try {
    result = await user_services.addUser(user);
  } catch (error) {
    console.log("Failed to add user");
  }
  expect(result).toBe(false);
});

test("getUser valid entry (success)", async () => {
  const result = await user_services.getUser(test_user._id);
  expect(result).not.toBe(false);
});

test("getUser invalid entry (failure)", async () => {
  let result = false;
  try {
    result = await user_services.deleteUser(test_user._id);
  } catch (error) {
    console.log("Failed to delete user");
  }
  expect(result).not.toBe(false);
});

test("deleteUser valid entry (success)", async () => {
  const result = await user_services.deleteUser(test_user._id);
  expect(result).not.toBe(false);
});

test("deleteUser invalid entry (failure)", async () => {
  let result = false;
  try {
    result = await user_services.deleteUser(12345);
  } catch (error) {
    console.log("Failed to delete user");
  }
  expect(result).toBe(false);
});
