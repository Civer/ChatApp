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
      userId: 15,
      sessionToken: "dc8e1622de23f6c68d2d6ee71ca1e9b2",
      chatId: "5d87b2f48d8b7035fcf077eb"
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
    console.log(requestUrl);
    var chatMessages = $.get({
      url: requestUrl,
      success: function(result) {
        console.log(result);
        console.log(result.chatMessages);
        console.log(result.chatMessages[0].userId);
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
      console.log(chatMessages[0].userName);
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
