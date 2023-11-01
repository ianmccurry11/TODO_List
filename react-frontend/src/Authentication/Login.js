import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [login, setLogin] = useState(false);

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
      .post("http://localhost:8000/login", user)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <h1>Login</h1>
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
export default Login;
