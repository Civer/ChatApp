import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      apiURL: CONFIG.environment,
      apiPath: "postmessage/",
      userId: localStorage.userid,
      sessionToken: localStorage.token,
      chatId: localStorage.chatid,
      message: "",
      error: "",
      sendingMessage: false,
      value: ""
    };
  }

  listenForEnter(e) {
    if (e.charCode === 13) {
      this.sendPost();
    }
  }

  updateMessageInformation(e) {
    this.setState({ message: e.target.value, value: e.target.value });
  }

  sendPost() {
    this.setState({ sendingMessage: true, value: "" });

    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var chatId = localStorage.chatid;
    var message = this.state.message;
    var returns = [];

    var requestUrl =
      apiURL +
      apiPath +
      userId +
      "&" +
      sessionToken +
      "&" +
      chatId +
      "&" +
      message;
    var returns = $.post({
      url: requestUrl,
      success: function(result) {
        returns = result.users;

        if (result.validPost === false) {
          if (result.errors) {
            switch (result.errors.id) {
              case 600:
                this.state.error = "Chat already opened!";
                break;
              case 220:
                this.state.error = "Your Partner is not verified!";
                break;
              default:
                this.state.error = "Backend Error!";
                break;
            }
          } else {
            this.state.error = "Backend Error!";
          }
        } else {
        }

        this.state.returns = returns;
        this.setState({ returns: this.state.returns, sendingMessage: false });
        this.props.reloadChat();
      }.bind(this)
    });
  }

  render() {
    if (this.state.sendingMessage === true) {
      var button = <div className="loaderSmall"></div>;
    } else {
      var button = (
        <div>
          {" "}
          <button
            onClick={this.sendPost.bind(this)}
            className="btn btn-sm btn-primary btn-block"
          >
            Post
          </button>
        </div>
      );
    }

    return (
      <div className="post">
        <div>
          <table width="100%">
            <tbody>
              <tr>
                <td className="postMessageInput">
                  <label htmlFor="inputEmail" className="sr-only">
                    Message
                  </label>
                  <input
                    type="post"
                    id="inputPost"
                    className="form-control"
                    placeholder="Message"
                    value={this.state.value}
                    onKeyPress={this.listenForEnter.bind(this)}
                    onChange={this.updateMessageInformation.bind(this)}
                    required
                    autoFocus
                  ></input>
                </td>
                <td className="postMessageButton">{button}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Post;
