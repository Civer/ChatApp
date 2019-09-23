import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ChatContainer from "./chatcontainer";
import MessageContainer from "./messagecontainer";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    return (
      <div>
        <div>
          <ChatContainer />
        </div>
        <div>
          <MessageContainer />
        </div>
      </div>
    );
  }
}

export default ChatApp;
