import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";
import crypto from "crypto";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: CONFIG.environment,
      apiPath: "register/",
      userName: "",
      password: "",
      email: "",
      error: null,
      formUsername: undefined,
      formPassword: undefined,
      formEmail: undefined
    };
  }

  back(message) {
    this.props.back(message);
  }

  handleInputChange(e) {
    var eventTarget = e.target;
    var value = eventTarget.value;
    var name = eventTarget.name;

    if (name === "password") {
      value = this.hashPassword(value).toUpperCase();
    }
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
    var formEmail = this.state.email;

    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var returns = [];

    var requestUrl =
      apiURL + apiPath + formUsername + "&" + formPassword + "&" + formEmail;

    var returns = $.post({
      url: requestUrl,
      success: function(result) {
        returns = result.users;

        if (result.validCall === false) {
          if (result.errors) {
            switch (result.errors.id) {
              case 700:
                this.state.error = "Username or Mail already taken!";
                break;
              default:
                this.state.error = "Backend Error!";
                break;
            }
          } else {
            this.state.error = "Backend Error!";
          }
        } else {
        }

        this.state.returns = returns;
        this.setState({ returns: this.state.returns });

        if (this.state.error !== null) {
          this.back({ type: "error", message: this.state.error });
        } else {
          this.back({
            type: "success",
            message: "Success. Check your emails for verification information."
          });
        }
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <h2 className="h3 mb-3 font-weight-normal signinHeader">
          Feel free to Sign Up
        </h2>
        <label htmlFor="inputUser" className="sr-only">
          Login
        </label>
        <input
          name="username"
          type="username"
          id="inputUser"
          className="form-control"
          placeholder="Login"
          value={this.state.formUsername}
          onChange={this.handleInputChange.bind(this)}
          required
          autoFocus
        ></input>
        <label htmlFor="inputEmail" className="sr-only">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email"
          value={this.state.formEmail}
          onChange={this.handleInputChange.bind(this)}
          required
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
          Register
        </button>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={this.back.bind(this)}
        >
          Back
        </button>
      </div>
    );
  }
}

export default SignUp;
