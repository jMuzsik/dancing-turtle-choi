import React, { Component } from "react";
import { putStudentThunk } from "../reducers/students";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validImage, createCampusOptions } from "./helpers/index";

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const quote = event.target.quote.value;
    const campusId = +event.target.campus.value;
    if (validImage(image) || image.length === 0) {
      const studentObj = {};
      //so many forms, so many things to check(user can submit only one thing)
      if (image.length > 0) {
        studentObj.image = image;
      }
      if (quote.length > 0) {
        studentObj.quote = quote;
      }
      if (name.length > 0) {
        studentObj.name = name;
      }
      const studentId = this.props.studentId;
      studentObj.id = studentId;
      studentObj.campusId = campusId;
      this.props.putStudent(studentObj, this.props.ownProps.history);
      event.target.name.value = "";
      event.target.image.value = "";
      event.target.quote.value = "";
    } else {
      alert("That ain't no image");
      event.target.name.value = "";
      event.target.image.value = "";
      event.target.quote.value = "";
    }
  }

  render() {
    const isMounted =
      this.props.students.length > 0 && this.props.campuses.length > 0;
    let campuses = [];
    if (isMounted) campuses = this.props.campuses;
    return (
      <div>
        <form
          className="pure-form pure-form-stacked"
          onSubmit={this.handleSubmit}
        >
          <label>
            Image:
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              autoFocus
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter new name"
              name="name"
              autoFocus
            />
          </label>
          <label>
            Quote:
            <input type="text" name="quote" placeholder="Enter quote" />
            <label>
              Campus:
              <select name="campus">
                {isMounted && createCampusOptions(campuses)}
              </select>
            </label>
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

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.students,
    campuses: state.campuses,
    ownProps
  };
};

const mapDispatchToProps = (dispatch, history) => {
  return {
    putStudent: (student, history) => {
      return dispatch(putStudentThunk(student, history));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentForm)
);
