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
      chatId: "5d87b2f48d8b7035fcf077eb"
    };
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
                    required
                    autoFocus
                  ></input>
                </td>
                <td className="postMessageButton">
                  <button className="btn btn-sm btn-primary btn-block">
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
