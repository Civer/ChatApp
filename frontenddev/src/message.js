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

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.loginName !== this.state.loginName) {
      this.setState({
        loginName: nextProps.loginName
      });
    }
    if (nextProps.message !== this.state.message) {
      this.setState({
        message: nextProps.message
      });
    }
    if (nextProps.date !== this.state.date) {
      this.setState({
        date: nextProps.date
      });
    }
  }

  rewriteDate() {
    var date = this.props.date;
    var newDate = new Date(date);
    var hours =
      newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    var minutes =
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes();
    return (
      newDate.getDate() +
      "." +
      (newDate.getMonth() + 1) +
      " - " +
      hours +
      ":" +
      minutes
    );
  }

  render() {
    return (
      <div className="message">
        <table width="100%">
          <tbody>
            <tr>
              <td className="messageUsername">{this.state.loginName}</td>
            </tr>
            <tr>
              <td className="messageText">{this.state.message}</td>
              <td className="messageDate">{this.rewriteDate()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Message;
