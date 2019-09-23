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
      userId: 15,
      sessionToken: "dc8e1622de23f6c68d2d6ee71ca1e9b2",
      chatId: "5d87b2f48d8b7035fcf077eb",
      query: "",
      value: "",
      suggestions: [],
      searchParameter: null,
      error: null,
      success: null
    };
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
          this.state.success =
            "You can now chat with " + this.state.searchParameter;
        }
        console.log(result);

        this.state.returns = returns;
        this.setState({ returns: this.state.returns });
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="search">
        <div>
          <form className="form-inline">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                ref={c => (this.title = c)}
                onChange={this.updateSearchInformation.bind(this)}
                name="title"
              />
              <button onClick={this.handleSearch.bind(this)}>+</button>
            </div>
          </form>
        </div>
        <div>
          <span className="error">{this.state.error}</span>
          <span className="success">{this.state.success}</span>
        </div>
      </div>
    );
  }
}

export default Search;
