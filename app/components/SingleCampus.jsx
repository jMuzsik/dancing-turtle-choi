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
      this.props.putStudent(student);
    }
  }

  findCampusStudents(campusId) {
    //grab students associated
    const students = this.props.students.filter(student => {
      return student.campusId === campusId;
    });
    return students;
  }

  createStudentDivs(students, campus) {
    return students.map(student => {
      return (
        <div key={student.id}>
          <NavLink key={student.id} to={`/students/${student.id}`}>
            <button id={student.id} className="button-success pure-button">
              {student.name}
            </button>
          </NavLink>
          <input
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
        className="campus-page"
        style={{
          background: `url(${campus.image}) repeat`
        }}
      >
        {campusesMounted && (
          <div>
            <h1 className="campus-title">{campus.name}</h1>
            <div className="campus-student">{studentDivs}</div>
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
