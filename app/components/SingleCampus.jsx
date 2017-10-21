import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { grabCampus } from "./helpers/index";
import { putStudentThunk } from "../reducers/students";
import CampusForm from "./CampusForm";

class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.findCampusStudents = this.findCampusStudents.bind(this);
    this.createStudentDivs = this.createStudentDivs.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(event) {
    event.preventDefault();
    const deleteUser = window.confirm("Are you sure?");
    const id = event.target.id;
    const student = {};
    student.campusId = null;
    student.id = id;
    if (deleteUser) {
      this.props.putStudent(student, this.props.ownProps.history);
    }
  }

  findCampusStudents(campusId) {
    //grab campuses associated
    const students = this.props.students.filter(student => {
      return student.campusId === campusId;
    });
    return students;
  }

  createStudentDivs(students, campus) {
    return students.map(student => {
      return (
        <div
          key={student.id}
          style={{
            display: "inline-block",
            paddingLeft: "3em",
            paddingBottom: "2em"
          }}
        >
          <NavLink key={student.id} to={`/students/${student.id}`}>
            <button
              style={{ backgroundColor: "black", color: "rgb(244, 209, 66)" }}
              id={student.id}
              className="button-success pure-button"
            >
              {student.name}
            </button>
          </NavLink>
          <input
            style={{ backgroundColor: "black", color: "rgb(239, 23, 23)" }}
            onClick={this.handleRemoval}
            id={student.id}
            type="submit"
            name="submit"
            value="x"
            className="button-warning pure-button"
          />
        </div>
      );
    });
  }

  render() {
    let campusesMounted = this.props.campuses.length > 0;
    //individual campus, associated students, divs for said students
    let campus = {},
     studentsAssociated = [],
     studentDivs = [];

    if (campusesMounted) {
      const campuses = this.props.campuses,
       campusId = Number(this.props.match.params.campusid);
      campus = grabCampus(campuses, campusId);
      studentsAssociated = this.findCampusStudents(campus.id);
      studentDivs = this.createStudentDivs(studentsAssociated, campus);
    }
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          background: `url(${campus.image}) repeat`,
          zIndex: "-1",
          width: "100vw",
          height: "100%"
        }}
      >
        {campusesMounted && (
          <div>
            <h1
              style={{ marginTop: "0", textAlign: "center", fontSize: "3em" }}
            >
              {campus.name}
            </h1>
            {studentDivs}
            <CampusForm id={campus.id} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  putStudent: (student, history) => {
    return dispatch(putStudentThunk(student, history));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
);
