import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCampusThunk } from "../reducers/campuses";
import { deleteStudentsThunk } from "../reducers/students";

class Campuses extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createCampusButtons() {
    const campusButtons = this.props.campuses.map(campus => {
      //yes, my css is all over the place, in css file and way too much inline styling
      return (
        <div className="campus" key={campus.id}>
          <h1>{campus.name}</h1>
          <img src={campus.image} />
          <NavLink key={campus.id} to={`/campuses/${campus.id}`}>
            <button key={campus.id} className="button-success pure-button">
              {campus.name}
            </button>
          </NavLink>
          <input
            className="button-warning pure-button"
            onClick={this.handleSubmit}
            id={campus.id}
            type="submit"
            value="x"
          />
        </div>
      );
    });
    return campusButtons;
  }
  handleSubmit(event) {
    event.preventDefault();
    const id = event.target.id;
    //every delete button goes through a confirm
    const deleteCampus = window.confirm("Are you sure?");
    if (deleteCampus) {
      this.props.deleteCampus(id, this.props.ownProps.history);
      this.props.deleteStudents(id);
    }
  }

  render() {
    //background stars
    return (
      <div className="campuses">
        <NavLink key="addCampus" to={"/addCampus"}>
          <button className="button-secondary pure-button">
            Create New Campus
          </button>
        </NavLink>
        <div>{this.createCampusButtons()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campuses: state.campuses
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteCampus: campus => {
    return dispatch(deleteCampusThunk(campus));
  },
  deleteStudents: campusId => {
    return dispatch(deleteStudentsThunk(campusId));
  },
  ownProps
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Campuses)
);
