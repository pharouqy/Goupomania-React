import React, { useState } from "react";
import "../styles/sign.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}api/auth/signup`, {
      method: "POST",
      withCredentials: true,
      body: JSON.stringify({
        pseudo: pseudo,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        console.log(res);
        navigate("/login");
        if (res.error) {
          console.log(res.error);
          alert(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="col-12 col-md center-block">
      <form onSubmit={signUp}>
        <h1>Register</h1>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="form2Example"
            className="form-control"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
          />
          <label className="form-label" htmlFor="form2Example">
            Pseudo Name
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
