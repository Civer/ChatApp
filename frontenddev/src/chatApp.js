import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ChatContainer from "./chatcontainer";
import MessageContainer from "./messagecontainer";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.reloadMessageWindow = this.reloadMessageWindow.bind(this);
    this.state = {
      isLoggedIn: true,
      messageWindowNeedsReload: undefined
    };
  }

  reloadMessageWindow() {
    this.setState({
      messageWindowNeedsReload: !this.state.messageWindowNeedsReload
    });
  }

  render() {
    return (
      <div>
        <div>
          <ChatContainer
            reloadMessageWindow={this.reloadMessageWindow.bind(this)}
          />
        </div>
        <div>
          <MessageContainer
            messageWindowNeedsReload={this.state.messageWindowNeedsReload}
          />
        </div>
      </div>
    );
  }
}

export default ChatApp;
