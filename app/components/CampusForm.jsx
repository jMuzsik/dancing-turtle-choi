import React, { Component } from "react";
import { putCampusThunk } from "../reducers/campuses";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validImage } from "./helpers/index";

class CampusForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const image = event.target.image.value;
    const name = event.target.name.value;
    if (validImage(image) || image.length === 0) {
      const campusObj = {};
      if (name.length > 0) {
        campusObj.name = name;
      }
      if (image.length > 0) {
        campusObj.image = image;
      }
      campusObj.id = this.props.id;
      this.props.putCampus(campusObj);
      event.target.name.value = "";
      event.target.image.value = "";
    } else {
      alert("That aint no image");
      event.target.name.value = "";
      event.target.image.value = "";
    }
  }

  render() {
    //repeatedly Check if campusMounted in this way
    const isMounted =
      this.props.students.length > 0 && this.props.campuses.length > 0;
    let campuses = [];
    if (isMounted) campuses = this.props.campuses;
    return (
      <div>
        <form
          className="campus-form pure-form pure-form-stacked"
          onSubmit={this.handleSubmit}
        >
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
            Change Image:
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
            />
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
    putCampus: (campus, history) => {
      return dispatch(putCampusThunk(campus, history));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CampusForm)
);
