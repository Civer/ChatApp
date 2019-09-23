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
      chatMessages: [],
      apiURL: CONFIG.environment,
      apiPath: "chatmessage/",
      userId: localStorage.userid,
      sessionToken: localStorage.token,
      chatId: localStorage.id
    };
    this.runAPICall = this.runAPICall.bind(this);
  }

  componentDidMount() {
    this.runAPICall();
  }

  runAPICall() {
    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var chatId = this.state.chatId;
    var chatMessages = [];

    var requestUrl =
      apiURL + apiPath + userId + "&" + sessionToken + "&" + chatId;
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
    console.log(localStorage.userid);
    console.log(localStorage.token);
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
