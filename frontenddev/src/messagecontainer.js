import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MessageWindow from "./messagewindow";
import Post from "./post";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    return (
      <div className="messageContainer">
        <div>
          <MessageWindow />
        </div>
        <div>
          <Post />
        </div>
      </div>
    );
  }
}

export default MessageContainer;
