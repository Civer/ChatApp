import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function Login() {
  return (
    <div className="loginContainer">
      <h2 className="h3 mb-3 font-weight-normal signinHeader">
        Please sign in
      </h2>
      <label htmlFor="inputEmail" className="sr-only">
        Login
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Login"
        required
        autoFocus
      ></input>
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      ></input>
      <p></p>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </div>
  );
}

export default Login;
