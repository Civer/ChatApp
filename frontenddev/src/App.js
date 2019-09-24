import React from "react";
import "./App.css";
import NavBar from "./navbar";
import Login from "./login";
import ChatApp from "./chatApp";
import SignUp from "./signup";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.back = this.back.bind(this);
    this.state = {
      isLoggedIn: false,
      signUp: false,
      errorMessage: null,
      successMessage: null
    };
  }

  signUp() {
    this.setState({
      signUp: true
    });
  }

  login() {
    this.setState({
      isLoggedIn: true
    });
  }

  logout() {
    localStorage.userid = null;
    localStorage.token = null;
    localStorage.chatid = null;
    this.setState({
      isLoggedIn: false
    });
  }

  back(message) {
    if (message && message.type === "error") {
      this.state.successMessage = null;
      this.state.successMessage = message.message;
    } else if (message && message.type === "success") {
      this.state.errorMessage = null;
      this.state.successMessage = message.message;
    } else {
      this.state.errorMessage = null;
      this.state.successMessage = null;
    }

    this.setState({
      signUp: false
    });
  }

  render() {
    var loadMainpart;

    if (localStorage.userId == "undefined") {
      localStorage.userid = null;
      localStorage.token = null;
      localStorage.chatid = null;
      this.setState({
        isLoggedIn: false,
        signUp: false
      });
    }

    if (
      localStorage.userid != "null" &&
      localStorage.userId != "undefined" &&
      localStorage.token != "null" &&
      localStorage.token == "undefined" &&
      this.state.isLoggedIn == false
    ) {
      this.setState({ isLoggedIn: true });
    }

    if (this.state.signUp) {
      loadMainpart = <SignUp back={this.back} />;
      console.log("TEST");
    } else {
      if (this.state.isLoggedIn) {
        loadMainpart = <ChatApp />;
        console.log("TEST2");
      } else {
        if (this.state.successMessage !== null) {
          loadMainpart = (
            <div>
              <p>{this.state.successMessage}</p>
              <Login signUp={this.signUp} login={this.login} />
            </div>
          );
        } else if (this.state.errorMessage !== null) {
          loadMainpart = (
            <div>
              <p>{this.state.errorMessage}</p>
              <Login signUp={this.signUp} login={this.login} />
            </div>
          );
        } else {
          loadMainpart = <Login signUp={this.signUp} login={this.login} />;
        }
      }
    }

    return (
      <div className="App Container">
        <NavBar loginState={this.state.isLoggedIn} logout={this.logout} />
        {loadMainpart}
      </div>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
