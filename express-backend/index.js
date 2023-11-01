import express from "express";
import cors from 'cors';
import jwt from "jsonwebtoken";
// import userServices from "./models/user-services.js";
import User from "./models/user_model/user.js";
import db from "./models/database.js";
import bcrypt from "bcrypt";
import auth from "./authentication/auth.js";
import dotenv from 'dotenv';
const port = process.env.PORT || 8000;
dotenv.config();
const app = express();
const db_connection = db.connect_to_mongo_db();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

// app.post("/users", async (req, res) => {
//   const user = req.body;
//   const savedUser = await userServices.addUser(user);
//   if (savedUser) res.status(201).send(savedUser);
//   else res.status(500).end();
// });

app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ username: request.body.username })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      console.log(user)
      console.log(user.password)
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if(passwordCheck === false) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            username: user.username,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "usernname not found",
        e,
      });
    });
});


app.post("/register", (request, response) => {
  // hash the password
  console.log(request)
  console.log(request.body.password, request.body.username)
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      console.log(hashedPassword)
      let user = new User({
        username: request.body.username,
        password: hashedPassword,
      });
      console.log(user)
      // save the new user
      user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
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
        e:e.message,
      });
    });
});

app.delete('/users/:id', async(req, res) => {
    let id = req.params['id']; //or req.params.id
    let successfully_deleted = await userServices.removeUserById(id);
    if(!successfully_deleted) {
        res.status(404).end()
    } else {
        res.status(204).end();
    }
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Example app listening at ${process.env.MONGODB_URI}`);
});