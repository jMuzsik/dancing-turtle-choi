import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCampusThunk } from "../reducers/campuses";
import { keepIdsInOrder, validImage } from "./helpers/index";

class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let image = event.target.image.value;
    //i check image length here so a submit still works w/out image
    if (validImage(image) || image.length === 0) {
      const campuses = this.props.campuses;
      //1,2,3,4 next object will be 5 -- never 2, 3,4,5 next is 6, next object would be 1
      const id = keepIdsInOrder(campuses);
      if (image.length === 0) {
        //default image
        image =
          "https://michaelspanofoundation.org/wp-content/uploads/2014/10/empty-spaces.jpg";
      }
      if (name.length === 0) {
        //default name
        name = "why you put no name???";
      }
      const campusObj = {
        id,
        name,
        image
      };
      this.props.postCampus(campusObj, this.props.ownProps.history);
    } else {
      alert("That aint no image");
    }
  }

  render() {
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
              placeholder="Enter Campus name"
              name="name"
              autoFocus
            />
            Image:
            <input type="text" name="image" placeholder="Enter image URL" />
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
  campuses: state.campuses
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postCampus: (campus, history) => {
    return dispatch(postCampusThunk(campus, history));
  },
  ownProps
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddCampus)
);
