import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      id: props.id
    };
  }

  openChat() {
    localStorage.chatid = this.state.id;
    this.props.reloadMessageWindow();
  }

  render() {
    return (
      <div className="message">
        <table>
          <tbody>
            <tr>
              <td>
                <button
                  onClick={this.openChat.bind(this)}
                  className="btn btn-sm btn-primary btn-block"
                >
                  {this.state.userName}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chat;
