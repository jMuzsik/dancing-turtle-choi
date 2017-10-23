import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putStudentThunk } from "../reducers/students";
import StudentForm from "./StudentForm";
import { grabCampus } from "./helpers/index";

class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibility: false
    };
    this.grabStudent = this.grabStudent.bind(this);
    this.createStudentDiv = this.createStudentDiv.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  grabStudent() {
    //grab singular student of page
    const studentId = Number(this.props.match.params.studentId);
    const filteredStudent = this.props.students.filter(student => {
      return student.id === studentId;
    });
    const student = filteredStudent[0];
    return student;
  }

  createStudentDiv(student) {
    return (
      <div
        className="single-student-div"
        style={{
          backgroundImage: `url(${student.image})`
        }}
      >
        <h1 className="single-student-name">{student.name}</h1>
        <div>
          <span className="single-student-quote">
            {student.quote || "say something"}
          </span>
        </div>
      </div>
    );
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ formVisibility: !this.state.formVisibility });
  }

  render() {
    const isMounted =
      this.props.students.length > 0 && this.props.campuses.length > 0;

    let student = [],
      studentDiv = [],
      campus = {};

    if (isMounted) {
      student = this.grabStudent();
      studentDiv = this.createStudentDiv(student);

      const campusId = student.campusId;
      const campuses = this.props.campuses;
      campus = grabCampus(campuses, campusId);
    }
    return (
      <div className="all-students">
        {isMounted && studentDiv}
        <button
          className="button-secondary pure-button"
          onClick={this.handleClick}
          type="button"
        >
          Edit
        </button>
        {campus.name ? (
          <NavLink to={`/campuses/${campus.id}`}>
            <button className="button-success pure-button">
              {campus.name}
            </button>
          </NavLink>
        ) : (
          ""
        )}
        {this.state.formVisibility && (
          <StudentForm studentId={student.id} campusId={student.campusId} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses,
  students: state.students
});

export default connect(mapStateToProps)(SingleStudent);
