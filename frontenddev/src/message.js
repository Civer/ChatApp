import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: props.loginName,
      message: props.message,
      date: props.date
    };
  }

  render() {
    return (
      <div className="message">
        <table>
          <tbody>
            <tr>
              <td>{this.state.loginName}</td>
            </tr>
            <tr>
              <td>{this.state.message}</td>
              <td>{this.state.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Message;
