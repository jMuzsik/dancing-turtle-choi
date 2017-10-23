import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudentThunk } from "../reducers/students";
import store from "../store";

class Students extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.checkCampus = this.checkCampus.bind(this);
  }

  createStudentDivs(students) {
    const studentsDivs = students.map(student => {
      return (
        <div className="individual-student" key={student.id}>
          <div>{student.name}</div>
          <img src={student.image} />
          <input
            onClick={this.handleSubmit}
            id={student.id}
            type="submit"
            name="submit"
            value="x"
            className="button-warning pure-button"
          />
          <NavLink key={student.id} to={`/students/${student.id}`}>
            <button id={student.id} className="button-success pure-button">
              Go
            </button>
          </NavLink>
        </div>
      );
    });
    return studentsDivs;
  }

  handleSubmit(event) {
    const id = event.target.id;

    const deleteUser = window.confirm("Are you sure?");
    event.preventDefault();

    if (deleteUser) {
      this.props.deleteStudent(id, this.props.ownProps.history);
    }
  }

  render() {
    const students = this.props.students,
      studentDivs = this.createStudentDivs(students);
    return (
      <div className="students-page">
        <NavLink key="addStudent" to={"/addstudent"}>
          <button className="button-secondary pure-button">
            Add a new student
          </button>
        </NavLink>
        <div className="container students">{studentDivs}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteStudent: (student, history) => {
      return dispatch(deleteStudentThunk(student, history));
    },
    ownProps
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Students)
);

//<img src={} alt="boohoo" className="img-responsive"/>
