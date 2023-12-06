import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./user";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function addUser(user) {
  try {
    const user_model = new UserModel(user);
    await user_model.save();
    return user_model;
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function getUser(user_id) {
  const user = await UserModel.findOne({ _id: user_id });
  return user;
}

async function deleteUser(user_id) {
  let user = false;
  try {
    user = await UserModel.deleteOne({ _id: user_id });
    return user;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export default {
  addUser,
  getUser,
  deleteUser,
};
