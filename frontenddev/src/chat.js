import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName
    };
  }

  render() {
    console.log(this.state.userName);
    return (
      <div className="message">
        <table>
          <tbody>
            <tr>
              <td>{this.state.userName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chat;
