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
      apiPath: "users/",
      userId: 15,
      sessionToken: "dc8e1622de23f6c68d2d6ee71ca1e9b2",
      chatId: "5d87b2f48d8b7035fcf077eb",
      query: "",
      value: "",
      suggestions: []
    };
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
    var users = [];
    var searchArray = [];

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

  render() {
    return (
      <div className="search">
        <div>
          <label htmlFor="inputEmail" className="sr-only">
            Search User
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Search User"
            required
            autoFocus
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
          ></input>
        </div>
        <div>{this.state.resultArray}</div>
      </div>
    );
  }
}

export default Search;
