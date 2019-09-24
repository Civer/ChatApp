import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./search";
import Chats from "./chats";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.reloadChats = this.reloadChats.bind(this);
    this.reloadMessageWindow = this.reloadMessageWindow.bind(this);
    this.state = {
      isLoggedIn: true,
      reloadChatFlag: false
    };
  }

  reloadMessageWindow() {
    this.props.reloadMessageWindow();
  }

  reloadChats() {
    console.log(this.state.reloadChatFlag);
    this.setState({ reloadChatFlag: !this.state.reloadChatFlag });
  }

  render() {
    return (
      <div className="chatContainer">
        <div>
          <Search reloadChats={this.reloadChats.bind(this)} />
        </div>
        <div>
          <Chats
            reloadMessageWindow={this.reloadMessageWindow.bind(this)}
            reloadChatFlag={this.state.reloadChatFlag}
          />
        </div>
      </div>
    );
  }
}

export default ChatContainer;
