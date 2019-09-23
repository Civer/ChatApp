import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./search";
import Chats from "./chats";

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    return (
      <div className="chatContainer">
        <div>
          <Search />
        </div>
        <div>
          <Chats />
        </div>
      </div>
    );
  }
}

export default ChatContainer;
