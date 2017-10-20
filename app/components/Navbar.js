import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  //basically buttons and styling to students,campuses,home
  render() {
    return (
      <div
        className="pure-menu pure-menu-horizontal container"
        style={{ backgroundColor: "rgb(159,242,80" }}
      >
        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/home"}>
              <button
                type="button"
                style={{ backgroundColor: "rgb(65, 238, 244)", width: "33vw" }}
                className="pure-menu-link pure-button"
              >
                Home
              </button>
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/students"}>
              <button
                style={{ backgroundColor: "rgb(244, 226, 65)", width: "33vw" }}
                type="button"
                className="pure-menu-link pure-button"
              >
                Students
              </button>
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/campuses"}>
              <button
                style={{ backgroundColor: "rgb(157, 244, 65)", width: "33vw" }}
                type="button"
                className="pure-menu-link pure-button"
              >
                Campuses
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect()(NavBar));
