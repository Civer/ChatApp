import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: props.loginState };
  }

  render() {
    var logoutButton;

    if (this.state.isLoggedIn === false) {
      logoutButton = <p></p>;
    } else {
      logoutButton = (
        <span className="logoutButton">
          <button className="btn btn-sm btn-primary btn-block" type="submit">
            Logout
          </button>
        </span>
      );
    }

    return (
      <div className="navbarContainer">
        <nav className="navbar">
          <table className="navbarTable">
            <tbody>
              <tr>
                <td className="tableLeftAlign">My ChatApp</td>
                <td className="tableRightAlign">{logoutButton}</td>
              </tr>
            </tbody>
          </table>
        </nav>
      </div>
    );
  }
}

export default NavBar;
