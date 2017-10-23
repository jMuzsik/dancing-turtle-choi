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
      <div className="pure-menu pure-menu-horizontal container">
        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/home"}>
              <button
                type="button"
                className="pure-menu-link pure-button home-button"
              >
                Home
              </button>
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/students"}>
              <button
                type="button"
                className="pure-menu-link pure-button students-button"
              >
                Students
              </button>
            </NavLink>
          </li>
          <li className="pure-menu-item pure-menu-selected">
            <NavLink to={"/campuses"}>
              <button
                type="button"
                className="pure-menu-link pure-button campuses-button"
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
