import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";
import Message from "./message";

class MessageWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      messageWindowNeedsReload: false,
      chatMessages: [],
      apiURL: CONFIG.environment,
      apiPath: "chatmessage/",
      userId: localStorage.userid,
      sessionToken: localStorage.token,
      chatId: localStorage.chatid
    };
    this.runAPICall = this.runAPICall.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (
      nextProps.messageWindowNeedsReload !== this.state.messageWindowNeedsReload
    ) {
      this.setState({
        messageWindowNeedsReload: nextProps.messageWindowNeedsReload,
        chatId: localStorage.chatid
      });
      this.runAPICall();
    }
  }

  componentDidMount() {
    this.runAPICall();
  }

  runAPICall() {
    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var chatId = localStorage.chatid;
    var chatMessages = [];

    var requestUrl =
      apiURL + apiPath + userId + "&" + sessionToken + "&" + chatId;
    console.log(requestUrl);
    var chatMessages = $.get({
      url: requestUrl,
      success: function(result) {
        chatMessages = result.chatMessages;
        this.state.chatMessages = chatMessages;
        this.setState({ chatMessages: this.state.chatMessages });
      }.bind(this)
    });
  }

  update;

  render() {
    var messages;

    if (this.state.chatMessages.length !== 0) {
      var chatMessages = this.state.chatMessages;
      console.log(chatMessages);
      var userName = chatMessages[0].userName;
      messages = [];

      for (var i = 0; i < chatMessages.length; i++) {
        messages.push(
          <Message
            key={i}
            loginName={chatMessages[i].userName}
            message={chatMessages[i].message}
            date={chatMessages[i].lastTimeAndDate}
          />
        );
      }
    } else {
      messages = <div className="loader"></div>;
    }

    return (
      <div className="messageWindow">
        <div>{messages}</div>
      </div>
    );
  }
}

export default MessageWindow;
