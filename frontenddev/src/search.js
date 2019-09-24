import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import CONFIG from "./helpers/config";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      apiURL: CONFIG.environment,
      apiPathUserSearch: "users/",
      apiPathOpenChat: "openchat/",
      userId: localStorage.userid,
      sessionToken: localStorage.token,
      chatId: "5d87b2f48d8b7035fcf077eb",
      query: "",
      value: "",
      suggestions: [],
      searchParameter: null,
      error: null,
      success: null
    };
  }

  listenForEnter(e) {
    if (e.charCode === 13) {
      this.handleSearch(e);
    }
  }

  updateSearchInformation(e) {
    this.setState({ searchParameter: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ error: null });
    var validCallArray = this.state.users.filter(
      word =>
        word.loginname.toUpperCase() ===
        this.state.searchParameter.toUpperCase()
    );
    if (validCallArray.length !== 0) {
      var data = validCallArray[0];
      if (data.userid === this.state.userId) {
        this.setState({ error: "You can't choose yourself" });
      } else {
        this.openChat(data.userid);
      }
    } else {
      this.setState({ error: "User not found" });
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPathUserSearch;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var users = [];

    var requestUrl = apiURL + apiPath + userId + "&" + sessionToken;
    var users = $.get({
      url: requestUrl,
      success: function(result) {
        users = result.users;
        this.state.users = users;
        this.setState({ users: this.state.users });
      }.bind(this)
    });
  }

  openChat(chatPartnerId) {
    var apiURL = this.state.apiURL;
    var apiPath = this.state.apiPathOpenChat;
    var userId = this.state.userId;
    var sessionToken = this.state.sessionToken;
    var returns = [];

    var requestUrl =
      apiURL + apiPath + userId + "&" + sessionToken + "&" + chatPartnerId;
    var returns = $.get({
      url: requestUrl,
      success: function(result) {
        returns = result.users;

        console.log(result.validCall);
        if (result.validCall === false) {
          if (result.errors) {
            switch (result.errors.id) {
              case 600:
                this.setState({ error: "Chat already opened!" });
                break;
              case 220:
                this.setState({ error: "Your Partner is not verified!" });
                break;
              default:
                this.setState({ error: "Backend Error!" });
                break;
            }
          } else {
            this.setState({ error: "Backend Error!" });
          }
        } else {
          var successMessage =
            "You can now chat with " + this.state.searchParameter;
          this.setState({ success: successMessage });

          //Update Chatlist!
        }
        console.log(result);

        this.state.returns = returns;
        this.setState({ returns: this.state.returns });
        this.props.reloadChats();
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="search">
        <div>
          <table width="100%">
            <tbody>
              <tr>
                <td className="postMessageInput">
                  <input
                    type="text"
                    className="form-control"
                    ref={c => (this.title = c)}
                    onKeyPress={this.listenForEnter.bind(this)}
                    onChange={this.updateSearchInformation.bind(this)}
                    name="title"
                  />
                </td>
                <td className="postMessageButton">
                  <button
                    onClick={this.handleSearch.bind(this)}
                    className="btn btn-sm btn-primary btn-block"
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p></p>
          <span className="error">{this.state.error}</span>
          <span className="success">{this.state.success}</span>
        </div>
      </div>
    );
  }
}

export default Search;
