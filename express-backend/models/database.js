import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect_to_mongo_db() {
  return mongoose
    .connect(
        process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

let db_connection = connect_to_mongo_db();

export default {
  db_connection,
  connect_to_mongo_db,
}