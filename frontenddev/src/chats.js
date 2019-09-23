import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";
import Chat from "./chat";

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      openChats: [],
      apiURL: CONFIG.environment,
      apiPath: "activechat/",
      userId: 15,
      sessionToken: "dc8e1622de23f6c68d2d6ee71ca1e9b2"
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
    var openChats = [];

    var requestUrl = apiURL + apiPath + userId + "&" + sessionToken;
    //console.log(requestUrl);
    var openChats = $.get({
      url: requestUrl,
      success: function(result) {
        openChats = result.chats;
        this.state.openChats = openChats;
        this.setState({ openChats: this.state.openChats });
      }.bind(this)
    });
  }

  update;

  render() {
    var chats;

    if (this.state.openChats.length !== 0) {
      var openChats = this.state.openChats;
      chats = [];
      for (var i = 0; i < openChats.length; i++) {
        var chat = openChats[i];
        var user1 = chat.userId1;
        var loginName;

        if (user1 == this.state.userId) {
          loginName = openChats[i].userName2;
        } else {
          loginName = openChats[i].userName1;
        }
        //console.log(loginName);

        chats.push(<Chat key={i} userName={loginName} />);
      }
    } else {
      chats = <div className="loader"></div>;
    }

    return (
      <div className="messageWindow">
        <div>{chats}</div>
      </div>
    );
  }
}

export default Chats;
