import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postStudentThunk } from "../reducers/students";
import store from "../store";
import { keepIdsInOrder, createCampusOptions } from "./helpers/index";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    //cruelty of option values only being strings
    const campusId = +event.target.option.value;
    //if no campus, no user can be created
    if (campusId.length === 0) return alert("Need a campus!!!");
    let name = event.target.name.value;
    //default name
    if (name.length === 0) name = "why no name???";
    const students = this.props.students;
    const id = keepIdsInOrder(students);
    const studentObj = {
      id,
      name,
      campusId
    };
    this.props.postStudent(studentObj, this.props.ownProps.history);
  }

  render() {
    const campuses = this.props.campuses;
    return (
      <div>
        <form
          className="pure-form pure-form-stacked"
          onSubmit={this.handleSubmit}
        >
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter student name"
              name="name"
              autoFocus
            />
          </label>
          <label>
            Campus:
            <select name="option">
              {campuses.length > 0 && createCampusOptions(campuses)}
            </select>
          </label>
          <input
            className="pure-button pure-button-primary"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses,
  students: state.students
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postStudent: (student, history) => {
    return dispatch(postStudentThunk(student, history));
  },
  ownProps
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddStudent)
);
