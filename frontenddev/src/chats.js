import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";
import Chat from "./chat";

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.reloadMessageWindow = this.reloadMessageWindow.bind(this);
    this.reloadChats = this.reloadChats.bind(this);
    this.state = {
      isLoggedIn: true,
      openChats: [],
      apiURL: CONFIG.environment,
      apiPath: "activechat/",
      userId: localStorage.userid,
      sessionToken: localStorage.token,
      noOpenChats: false,
      reloadChatFlag: this.props.reloadChatFlag
    };
    this.runAPICall = this.runAPICall.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.reloadChatFlag !== this.state.reloadChatFlag) {
      this.setState({
        reloadChatFlag: nextProps.reloadChatFlag
      });
      this.runAPICall();
    }
  }

  reloadMessageWindow() {
    this.props.reloadMessageWindow();
  }

  reloadChats() {
    this.props.reloadChats();
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
    var openChats = $.get({
      url: requestUrl,
      success: function(result) {
        openChats = result.chats;
        if (openChats.length > 0) {
          this.state.openChats = openChats;
        } else {
          this.state.noOpenChats = true;
        }

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
        var id = chat._id;
        var user1 = chat.userId1;
        var loginName;

        if (user1 == this.state.userId) {
          loginName = openChats[i].userName2;
        } else {
          loginName = openChats[i].userName1;
        }

        chats.push(
          <Chat
            key={i}
            userName={loginName}
            id={id}
            reloadMessageWindow={this.reloadMessageWindow.bind(this)}
          />
        );
      }
    } else {
      if (this.state.noOpenChats) {
        chats = <div>Search for Users to begin!</div>;
      } else {
        chats = <div className="loader"></div>;
      }
    }

    return (
      <div className="messageWindow">
        <p>Open Chats</p>
        <div>{chats}</div>
      </div>
    );
  }
}

export default Chats;
