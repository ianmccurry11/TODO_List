import axios from "axios";
import React, { useState } from "react";

function Registration() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password")
      setUser({ username: user["username"], password: value });
    else setUser({ username: value, password: user["password"] });
  };

  const submitForm = () => {
    console.log(user);
    alert("You are submitting " + user.username + " " + user.password);
    setUser({ username: "", password: "" });
    axios
      .post("http://localhost:8000/register", user)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    </>
  );
}
export default Registration;
