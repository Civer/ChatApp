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
      userId: 15,
      sessionToken: "dc8e1622de23f6c68d2d6ee71ca1e9b2",
      chatId: "5d87b2f48d8b7035fcf077eb",
      message: "",
      error: ""
    };
  }

  updateMessageInformation(e) {
    this.setState({ message: e.target.value });
  }

  sendPost() {
    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPath;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var chatId = this.state.chatId;
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
        console.log(result);

        this.state.returns = returns;
        this.setState({ returns: this.state.returns });
      }.bind(this)
    });
  }

  render() {
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
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Message"
                    onChange={this.updateMessageInformation.bind(this)}
                    required
                    autoFocus
                  ></input>
                </td>
                <td className="postMessageButton">
                  <button
                    onClick={this.sendPost.bind(this)}
                    className="btn btn-sm btn-primary btn-block"
                  >
                    Post
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Post;
