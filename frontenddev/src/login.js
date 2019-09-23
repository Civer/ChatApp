import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";
import crypto from "crypto";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: CONFIG.environment,
      apiPath: "login/",
      userName: "",
      password: "",
      error: null,
      formUsername: undefined,
      formPassword: undefined
    };
  }

  signUp(e) {
    e.preventDefault();
    this.props.signUp();
  }

  handleInputChange(e) {
    var eventTarget = e.target;
    var value = eventTarget.value;
    var name = eventTarget.name;

    console.log(name);
    if (name === "password") {
      value = this.hashPassword(value).toUpperCase();
    }
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  hashPassword(pass) {
    var sha256Pass = crypto
      .createHash("sha256")
      .update(pass)
      .digest("hex");
    return sha256Pass;
  }

  register(e) {
    var formUsername = this.state.username;
    var formPassword = this.state.password;

    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var returns = [];

    var requestUrl = apiURL + apiPath + formUsername + "&" + formPassword;

    var returns = $.post({
      url: requestUrl,
      success: function(result) {
        returns = result.users;

        if (result.validCall === false) {
          if (result.errors) {
            switch (result.errors.id) {
              case 100:
                this.state.error = "Username or Password unknown or wrong!";
                break;
              case 120:
                this.state.error = "Username or Password unknown or wrong!";
                break;
              case 130:
                this.state.error = "User is not verified yet!";
                break;
              default:
                this.state.error = "Backend Error!";
                break;
            }
          } else {
            this.state.error = "Backend Error!";
          }
        } else {
          localStorage.userid = result.userId;
          localStorage.token = result.token;
          this.props.login();
        }
        console.log(result);

        this.state.returns = returns;
        this.setState({ returns: this.state.returns });
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <h2 className="h3 mb-3 font-weight-normal signinHeader">
          Please sign in
        </h2>
        <label htmlFor="inputUsername" className="sr-only">
          Login
        </label>
        <input
          name="username"
          type="username"
          id="inputUsername"
          className="form-control"
          placeholder="Login"
          value={this.state.formUsername}
          onChange={this.handleInputChange.bind(this)}
          required
          autoFocus
        ></input>
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={this.state.formPassword}
          onChange={this.handleInputChange.bind(this)}
          required
        ></input>
        <p></p>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={this.register.bind(this)}
        >
          Sign in
        </button>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={this.signUp.bind(this)}
        >
          Sign up
        </button>
      </div>
    );
  }
}

export default Login;
