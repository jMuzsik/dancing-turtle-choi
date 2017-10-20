import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteStudentThunk } from "../reducers/students";
import store from "../store";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reRender: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkCampus = this.checkCampus.bind(this);
  }

  checkCampus(studentId) {
    const studentCampusFilter = this.props.campuses.filter(
      campus => campus.id === studentId
    );
    if (!studentCampusFilter.length) return;
    return studentCampusFilter[0].name;
  }

  handleSubmit(event) {
    const id = event.target.id;

    const deleteUser = window.confirm("Are you sure?");
    event.preventDefault();

    if (deleteUser) {
      this.props.deleteStudent(id, this.props.ownProps.history);
      // this.setState({reRender: this.state.`reRender++})
    }
  }

  render() {
    const studentsDivs = this.props.students.map(student => {
      return (
        <div
          style={{
            color: "white",
            textAlign: "center",
            float: "left",
            padding: "2em",
            width: "25vw",
            marginLeft: "5em"
          }}
          key={student.id}
          className="individualstudent"
        >
          <div style={{ display: "inline-block" }}>{student.name}</div>
          <img style={{ width: "100%", height: "20vh" }} src={student.image} />
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
    return (
      <div
        style={{
          background:
            "url(https://michaelspanofoundation.org/wp-content/uploads/2014/10/empty-spaces.jpg)no-repeat",
          backgroundSize: "cover",
          zIndex: "-1"
        }}
      >
        <NavLink key="addStudent" to={"/addstudent"}>
          <button
            style={{ width: "100%" }}
            className="button-secondary pure-button"
          >
            Add a new student
          </button>
        </NavLink>
        <div className="container students">{studentsDivs}</div>
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
