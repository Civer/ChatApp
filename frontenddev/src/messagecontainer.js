import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MessageWindow from "./messagewindow";
import Post from "./post";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.reloadChat = this.reloadChat.bind(this);
    this.state = {
      isLoggedIn: true,
      messageWindowNeedsReload: this.props.messageWindowNeedsReload
    };
  }

  reloadChat() {
    this.setState({
      messageWindowNeedsReload: !this.state.messageWindowNeedsReload
    });
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (
      nextProps.messageWindowNeedsReload !== this.state.messageWindowNeedsReload
    ) {
      this.setState({
        messageWindowNeedsReload: nextProps.messageWindowNeedsReload
      });
    }
  }

  render() {
    if (localStorage.chatid != 0) {
      var messageWindowComponent = (
        <div>
          <MessageWindow
            messageWindowNeedsReload={this.state.messageWindowNeedsReload}
          />
        </div>
      );
      var postWindowComponent = (
        <div className="divPost">
          {" "}
          <Post reloadChat={this.reloadChat.bind(this)} />
        </div>
      );
    } else {
      var messageWindowComponent = (
        <div>
          <p>
            <strong>Chat Bot</strong>
          </p>
          <p>
            It seems that you haven't selected a chat yet. Select a chat to
            start.
          </p>
        </div>
      );
      var postWindowComponent = null;
    }

    return (
      <div className="messageContainer">
        {messageWindowComponent} <p></p> {postWindowComponent}
      </div>
    );
  }
}

export default MessageContainer;
