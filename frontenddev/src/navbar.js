import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: this.props.isLoggedIn };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.isLoggedIn !== this.state.isLoggedIn) {
      this.setState({
        isLoggedIn: nextProps.isLoggedIn
      });
    }
  }

  logout() {
    this.props.logout();
    this.setState({ isLoggedIn: false });
  }

  render() {
    var logoutButton;

    if (this.state.isLoggedIn === false) {
      logoutButton = <p></p>;
    } else {
      logoutButton = (
        <span className="logoutButton">
          <button
            className="btn btn-sm btn-primary btn-block"
            type="submit"
            onClick={this.logout.bind(this)}
          >
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
