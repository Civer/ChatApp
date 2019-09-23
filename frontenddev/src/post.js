import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
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
