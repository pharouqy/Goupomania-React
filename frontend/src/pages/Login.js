import React, { useState, useContext } from "react";
import "../styles/sign.css";
import { UserContext } from "../utils/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, login } = useContext(UserContext);
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      withCredentials: true,
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          alert(res.message);
          login(res.token);
          console.log(token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-12 col-md center-block">
      <form onSubmit={signIn}>
        <h1>Login</h1>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="form-label" for="form2Example1">
            Email address
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="form-label" for="form2Example2">
            Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
