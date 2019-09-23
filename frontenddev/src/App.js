import React from "react";
import "./App.css";
import NavBar from "./navbar";
import Login from "./login";
import ChatApp from "./chatApp";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: true
    };
  }

  logout() {
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    var loadMainpart;

    if (this.state.isLoggedIn) {
      loadMainpart = <ChatApp />;
    } else {
      loadMainpart = <Login />;
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
