import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import tasksServices from "./models/tasks-services.js";
import update_user_metrics from "./models/user_metrics/user_metrics_lifetime_services.js";
import User from "./models/user_model/user.js";
import db from "./models/database.js";
import auth from "./authentication/auth.js";

const port = process.env.PORT || 8000;
const SECRET_TOKEN_KEY = process.env.SECRET || "RANDOM-TOKEN";
dotenv.config();
const app = express();
db.connect_to_mongo_db();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", async (req, res) => {
  const { taskName } = req.query;
  const { priority } = req.query;
  const { deadline } = req.query;
  const { category } = req.query;
  const { location } = req.query;
  try {
    let result = await tasksServices.getTasks(
      taskName,
      priority,
      deadline,
      category,
      location,
    );

    // Check if returned result is an empty array, if so, then return a 404 error
    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send("Damn. Resource not found.");
    } else {
      // If result is not an empty array, then return the result to the frontend
      result = { users_tasks: result };
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await tasksServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Damn. Resource not found.");
  else {
    res.send({ users_tasks: result });
  }
});

/* Need to connect to the frontend in order to produce new users. This should 
technically work, but I can't test it until I get the frontend working. ESLint >:(  */
app.post("/tasks", async (req, res) => {
  console.log("made it to post function in index.js");
  const newTask = req.body;
  const user_id = new mongoose.Types.ObjectId(req.body.owner);
  newTask.owner = user_id;
  const savedTask = await tasksServices.addTask(newTask);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

/* Once connected with frontend, can remove del from the URL
pathway and just do "/tasks/:id" cause frontend will handle
the targeted tasks */

// For some reason when I call /tasks/del/:id, it tries to get instead of delete
// Will not even return any personal error messages
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params; // or req.params.id
    console.log("id", id);
    const successfullyDeleted = await tasksServices.deleteTask(id);
    if (!successfullyDeleted) {
      res.status(404).end("Resource Not Found");
    } else {
      res.status(204).end("Successfully deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Server Error");
  }
});

app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ username: request.body.username })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (passwordCheck === false) {
            console.log("passwords do not match");
            return response.status(400).send({
              message: "Passwords does not match",
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            SECRET_TOKEN_KEY,
            { expiresIn: "3d" },
          );
          console.log(user.username, user._id, token);
          //   return success response
          return response.status(200).send({
            message: "Login Successful",
            username: user.username,
            id: user._id,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          console.log(error);
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      console.log(e);
      response.status(404).send({
        message: "username not found",
        e,
      });
    });
});

app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        username: request.body.username,
        password: hashedPassword,
      });
      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            SECRET_TOKEN_KEY,
            { expiresIn: "3d" },
          );
          response.status(201).send({
            message: "User Created Successfully",
            token,
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e: e.message,
      });
    });
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  console.log("updatedTask", updatedTask);
  if (updatedTask.completed === true) {
    update_user_metrics(id, () => {
      console.log("Updated user metrics");
    });
  }
  try {
    const result = await tasksServices.updateTask(id, updatedTask);
    if (result === undefined || result === null)
      res.status(404).send("Damn. Resource not found.");
    else {
      res.send({ users_tasks: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening at ${process.env.MONGODB_URI}`);
});
